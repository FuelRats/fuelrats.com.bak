'use strict'

let BowerWebpackPlugin = require('bower-webpack-plugin')
let path = require('path')
let Webpack = require('webpack')





module.exports = {
  app: {
    devtool: 'source-map',

    entry: './js/bootstrap.js',

    output: {
      filename: 'dist/app.js',
      sourceMapFilename: 'dist/app.js.map'
    },

    module: {
      loaders: [
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          query: {
            helperDirs: path.resolve(__dirname, '..', 'js', 'helpers'),
            partialDirs: path.resolve(__dirname, '..', 'templates', 'partials')
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.js$/,
          loader: 'uglify-loader'
        },
        {
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          test: /\.js$/
        }
      ]
    },

    plugins: [
      new BowerWebpackPlugin({
        excludes: [
          /.*\.css$/,
          /.*\.less/,
          /.*\.scss$/
        ]
      }),
      new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: 'underscore'
      })
    ],

    resolve: {
      alias: {
        collections: path.resolve(__dirname + '/../js/collections'),
        models: path.resolve(__dirname + '/../js/models'),
        routes: path.resolve(__dirname + '/../js/routes'),
        templates: path.resolve(__dirname + '/../templates'),
        views: path.resolve(__dirname + '/../js/views')
      }
    },

    stats: {
      colors: true,
      reasons: true
    }
  }
}
