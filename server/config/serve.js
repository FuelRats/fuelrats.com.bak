'use strict'





const mount = require('koa-mount')
const serve = require('koa-static')





module.exports = function (app, config) {

  /******************************************************************************\
    Serve static files
  \******************************************************************************/

  app.use(mount('/dist', serve('./dist')))
  app.use(mount('/assets', serve('./assets')))
}
