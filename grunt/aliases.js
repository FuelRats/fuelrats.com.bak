module.exports = {
  default: [
    'build',
    'server',
    'watch'
  ],

  build: [
    'clean:app',
    'updateLocales',
    'buildCSS',
    'buildJS'
  ],

  buildJS: [
    'webpack'
  ],

  buildCSS: [
    'buildAppCSS',
    'buildLibCSS'
  ],

  buildAppCSS: [
    'copy:fontawesome',
    'sass_globbing',
    'sass:appCSS'
  ],

  buildLibCSS: [
    'sass:libCSS'
  ],

  updateLocales: [
    'clean:locales',
    'copy:locales'
  ],

  dist: [
    'build',
    'cssmin',
    'uglify',
    'server'
  ],

  server: [
    'configureProxies:app',
    'connect'
  ]
}
