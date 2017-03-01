'use strict'

let serveStatic = require('serve-static')

let config = require('../config')





let API_PROPS = {
  host: process.env.API_HOSTNAME || config.api.hostname || 'localhost',
  port: process.env.API_PORT || config.api.port || 8080,
  ssl: process.env.API_SSL || config.api.ssl || false
}

let HTTP_PROPS = {
  host: process.env.HOSTNAME || config.http.hostname || 'localhost',
  port: process.env.PORT || config.http.port || 8080,
  ssl: process.env.SSL || config.http.ssl || false
}

function getProtocol (useSSL) {
  return useSSL ? 'https' : 'http'
}





module.exports = {
  app: {
    options: {
      debug: true,

      host: process.env.HOSTNAME || HTTP_PROPS.hostname || '0.0.0.0',

      keepalive: process.env.NODE_ENV === 'production' || false,

      middleware: function (connect, options) {
        let middlewares = []

        if (process.env.NODE_ENV === 'development') {
          middlewares.push(require('connect-livereload')({
            rules: [{
              match: /<\/head>(?![\s\S]*<\/head>)/i,
              fn: function (match, script) {
                return script + match
              }
            }]
          }))
        }

        middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest)
        middlewares.push(require('connect-pushstate')())

        if (!Array.isArray(options.base)) {
          options.base = [options.base]
        }

        options.base.forEach(function (base) {
          middlewares.push(serveStatic(base))
        })

        return middlewares
      },

      port: HTTP_PROPS.port || 3000,

      protocol: getProtocol(HTTP_PROPS.ssl)
    },

    proxies: [
      {
        context: [
          '/api'
        ],
        debug: true,
        headers: {
          host: API_PROPS.host,
          referer: API_PROPS.host
        },
        host: API_PROPS.host,
        https: API_PROPS.ssl,
        port: API_PROPS.port,
        protocol: getProtocol(API_PROPS.ssl),
        rewrite: {
          '^/api': ''
        }
      },
      {
        context: [
          '/wp-api'
        ],
        debug: true,
        headers: {
          Authorization: 'Basic ' + new Buffer(config.wordpress.username + ':' + config.wordpress.applicationPassword).toString('base64'),
          host: 'www.fuelrats.com',
          referer: 'www.fuelrats.com'
        },
        host: 'www.fuelrats.com',
        https: HTTP_PROPS.ssl,
        port: HTTP_PROPS.ssl ? 443 : 80,
        protocol: getProtocol(HTTP_PROPS.ssl),
        rewrite: {
          '^/wp-api': '/wp-json/wp/v2'
        }
      },
      {
        context: [
          '/edsm-api'
        ],
        debug: true,
        headers: {
          host: 'www.edsm.net',
          referer: 'www.edsm.net'
        },
        host: 'www.edsm.net',
        https: true,
        port: 443,
        protocol: 'https:',
        rewrite: {
          '^/edsm-api': ''
        }
      }
    ]
  }
}
