'use strict'

let serveStatic = require('serve-static')

let config = require('../config')





module.exports = {
  app: {
    options: {
      debug: true,

      host: process.env.HOSTNAME || config.http.hostname || '0.0.0.0',

      keepalive: process.env.KEEPALIVE || config.http.keepalive || false,

      middleware: function (connect, options) {
        let middlewares = [
          require('connect-livereload')({
            rules: [{
              match: /<\/head>(?![\s\S]*<\/head>)/i,
              fn: function (match, script) {
                return script + match
              }
            }]
          }),
          require('grunt-connect-proxy/lib/utils').proxyRequest,
          require('connect-pushstate')()
        ]

        if (!Array.isArray(options.base)) {
          options.base = [options.base]
        }

        options.base.forEach(function (base) {
          middlewares.push(serveStatic(base))
        })

        return middlewares
      },

      port: process.env.PORT || config.http.port || 3000,

      protocol: config.http.ssl ? 'https' : 'http'
    },

    proxies: [
      {
        context: [
          '/api'
        ],
        debug: true,
        headers: {
          host: 'localhost',
          referer: 'localhost'
        },
        host: 'localhost',
        https: false,
        port: 8080,
        protocol: 'http:',
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
        https: config.http.ssl,
        port: config.http.ssl ? 443 : 80,
        protocol: config.http.ssl ? 'https:' : 'http:',
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
