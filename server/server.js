'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

const config = require('./config')





/******************************************************************************\
  Initialize the app
\******************************************************************************/

// Start Koa
const app = new (require('koa'))

// Configure proxies
require('./config/proxy')(app, config)

// Configure middleware, et al
require('./config/koa')(app, config)

// Configure static file serving
require('./config/serve')(app, config)

// Configure the router
require('./config/router')(app, config)





/******************************************************************************\
  Start the server
\******************************************************************************/

console.log('Listening on port', process.env.PORT || 3001)
app.listen(process.env.PORT || 3001)
