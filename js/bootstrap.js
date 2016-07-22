import Backbone from 'backbone'
import 'backbone.base-router'
import 'backbone.hoard'
import 'backbone.intercept'
import 'backbone.marionette'
import 'backbone.radio'
import 'backbone.stickit'
import './shims/backbone.radio'
import './shims/marionette.replaceElement'

import marked from 'marked'
import './shims/marked.latex'

import Prism from 'prism'

import './shims/capitalize'
import './shims/stringToColor'

import App from './App'





// Set up marked to use prism for syntax highlighting
marked.setOptions({
  highlight: (code, language) => {
    return Prism.highlight(code, Prism.languages[language])
  }
})





// Start the damn thing already
window.app = new App
app.start()
