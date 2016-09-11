import Backbone from 'backbone'

import template from 'templates/Author.hbs'





export default class Author extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change sync', this.render)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get className () {
    return 'author'
  }

  get tagName () {
    return 'span'
  }

  get template () {
    return template
  }
}
