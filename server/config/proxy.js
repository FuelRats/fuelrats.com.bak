'use strict'





const proxy = require('koa-proxies')





module.exports = function (app, config) {

  /******************************************************************************\
    Proxy Wordpress requests
  \******************************************************************************/

  app.use(proxy('/wp-api', {
    auth: `${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_PASSWORD}`,
    changeOrigin: true,
    rewrite: path => path.replace(/^\/wp\-api/, '/wp-json/wp/v2'),
    target: 'https://fuelrats.com',

//    debug: true,
//    headers: {
//      Authorization: 'Basic ' + new Buffer(config.wordpress.username + ':' + config.wordpress.applicationPassword).toString('base64'),
//      host: 'www.fuelrats.com',
//      referer: 'www.fuelrats.com'
//    },
//    host: 'www.fuelrats.com',
//    https: HTTP_PROPS.ssl,
//    port: HTTP_PROPS.ssl ? 443 : 80,
//    protocol: getProtocol(HTTP_PROPS.ssl),
//    rewrite: {
//      '^/wp-api': '/wp-json/wp/v2'
//    }
  }))
}








//[
//  {
//    context: [
//      '/api'
//    ],
//    debug: true,
//    headers: {
//      host: API_PROPS.host,
//      referer: API_PROPS.host
//    },
//    host: API_PROPS.host,
//    https: API_PROPS.ssl,
//    port: API_PROPS.port,
//    protocol: getProtocol(API_PROPS.ssl),
//    rewrite: {
//      '^/api': ''
//    }
//  },
//  {
//    context: [
//      '/wp-api'
//    ],
//    debug: true,
//    headers: {
//      Authorization: 'Basic ' + new Buffer(config.wordpress.username + ':' + config.wordpress.applicationPassword).toString('base64'),
//      host: 'www.fuelrats.com',
//      referer: 'www.fuelrats.com'
//    },
//    host: 'www.fuelrats.com',
//    https: HTTP_PROPS.ssl,
//    port: HTTP_PROPS.ssl ? 443 : 80,
//    protocol: getProtocol(HTTP_PROPS.ssl),
//    rewrite: {
//      '^/wp-api': '/wp-json/wp/v2'
//    }
//  },
//  {
//    context: [
//      '/edsm-api'
//    ],
//    debug: true,
//    headers: {
//      host: 'www.edsm.net',
//      referer: 'www.edsm.net'
//    },
//    host: 'www.edsm.net',
//    https: true,
//    port: 443,
//    protocol: 'https:',
//    rewrite: {
//      '^/edsm-api': ''
//    }
//  }
//]
