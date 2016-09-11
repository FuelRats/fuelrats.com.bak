import Backbone from 'backbone'

import template from 'templates/Category.hbs'





export default class Category extends Backbone.Marionette.ItemView {

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
    return 'category'
  }

  get tagName () {
    return 'li'
  }

  get template () {
    return template
  }
}
