import 'webcomponentsjs'
import './components/tags-input'

import i18next from 'i18next'
import i18nextCache from 'i18next-localstorage-cache'
import i18nextLanguageDetector from 'i18next-browser-languagedetector'
import i18nextOptions from '../locales/options.json'
import i18nextXHR from 'i18next-xhr-backend'

import Backbone from 'backbone'
import 'backbone.base-router'
import 'backbone.hoard'
import 'backbone.intercept'
import 'backbone.marionette'
import 'backbone.paginator'
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





// Set some default values for XHRs made with jQuery
$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
})

// Set up marked to use prism for syntax highlighting
marked.setOptions({
  highlight: (code, language) => {
    return Prism.highlight(code, Prism.languages[language])
  }
})

// Things to do once the page is loaded
$(document).ready(() => {
  // Set up i18next
  i18next
  .use(i18nextCache)
  .use(i18nextLanguageDetector)
  .use(i18nextXHR)
  .init(i18nextOptions, error => {
    if (error) {
      throw error
    }

    // Start the damn thing already
    window.app = new App
    app.start()
  })
})
