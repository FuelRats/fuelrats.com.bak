'use strict'

let serveStatic = require('serve-static')

let config = require('../config')





module.exports = {
  app: {
    options: {
      debug: true,

      keepalive: config.http.keepalive || false,

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
      port: process.env.PORT || config.http.port
    },

    proxies: [
      {
        context: [
          '/api'
        ],
        headers: {
          host: 'fuelrats.com'
        },
        host: 'fuelrats.com',
        https: true,
//        rewrite: {
//          'wp-json/wp/v2': ''
//        }
      }
    ]
  }
}
