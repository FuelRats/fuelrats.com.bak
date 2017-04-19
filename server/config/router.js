'use strict'

const path = require('path')
const router = require('koa-router')()
const send = require('koa-send')





//let auth = require('../controllers/auth')





let secured = function * secured (next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.status = 401
  }
}





module.exports = function (app, config) {

  /******************************************************************************\
    GET routes
  \******************************************************************************/

  router.get('*', async (ctx) => {
    await send(ctx, 'index.html')
  })





  /******************************************************************************\
    POST routes
  \******************************************************************************/

//  router.post('/evolve', login(), getItemTemplates(), pokemon.evolve)





  /******************************************************************************\
    Attach the router to the app
  \******************************************************************************/

  app.use(router.routes())
  app.use(router.allowedMethods())
}
