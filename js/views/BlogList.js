import Backbone from 'backbone'

import BlogSummaryView from 'views/BlogSummary'
import template from 'templates/BlogList.hbs'





export default class BlogList extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.collection, 'change', this.render)
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
    return BlogSummaryView
  }

  get className () {
    return 'article-list'
  }

  get tagName () {
    return 'ol'
  }
}
