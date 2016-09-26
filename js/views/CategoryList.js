import Backbone from 'backbone'

import CategoryView from 'views/Category'

import template from 'templates/CategoryList.hbs'





export default class CategoryList extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.collection, 'add change remove', this.render)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)

    this._bindEvents()
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  get childView () {
    return CategoryView
  }

  get className () {
    return 'category-list'
  }

  get tagName () {
    return 'ul'
  }
}
