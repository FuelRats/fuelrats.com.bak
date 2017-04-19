'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

let bodyParser = require('koa-bodyparser')
let compress = require('koa-compress')
let logger = require('koa-logger')





module.exports = function (app, config) {

  /******************************************************************************\
    Set up middleware
  \******************************************************************************/

  app.use(logger())
  app.use(compress())
  app.use(bodyParser())
}
