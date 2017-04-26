'use strict'

let grunt = require('grunt')
let path = require('path')

let config = require('../config')





module.exports = {
  options: {
    interrupt: true,
    spawn: true
  },

  appJS: {
    files: [
      'bower.json',
      'config.json',
      'package.json',
      'js/**/*.js',
      'templates/**/*.hbs',
      '!js/workers/**/*.js'
    ],
    tasks: [
      'buildJS'
    ],
    options: {
      livereload: true
    }
  },

  appCSS: {
    files: [
      'scss/**/*.scss',
      '!scss/_animations.scss',
      '!scss/_colors.scss',
      '!scss/_components.scss',
      '!scss/_core.scss',
      '!scss/_fonts.scss',
      '!scss/_helpers.scss',
      '!scss/_mixins.scss',
      '!scss/_variables.scss',
      '!scss/lib.scss'
    ],
    tasks: [
      'buildAppCSS'
    ],
    options: {
      livereload: true
    }
  },

  libCSS: {
    files: [
      'scss/lib.scss'
    ],
    tasks: [
      'buildLibCSS'
    ],
    options: {
      livereload: true
    }
  },

  locales: {
    files: [
      'locales/**/*.json',
      'locales/options.json'
    ],
    tasks: [
      'updateLocales'
    ],
    options: {
      livereload: true
    }
  },

  workers: {
    files: [
      'js/workers/**/*.js'
    ],
    tasks: [
      'updateWorkers'
    ],
    options: {
      livereload: true
    }
  }
}
