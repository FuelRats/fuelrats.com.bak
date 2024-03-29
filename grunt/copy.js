module.exports = {
  fontawesome: {
    dest: 'assets/fonts/font-awesome/',
    expand: true,
    filter: 'isFile',
    flatten: true,
    src: 'bower_components/font-awesome/fonts/*'
  },

  locales: {
    dest: 'assets/',
    filter: 'isFile',
    src: 'locales/**/*.json'
  },

  workers: {
    dest: 'dist/workers/',
    expand: true,
    filter: 'isFile',
    flatten: true,
    src: 'js/workers/**/*.js'
  }
}
