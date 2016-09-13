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
      events: {
        'click button#next': 'nextPage',
        'click button#previous': 'previousPage'
      },
      template: template
    })

    super(options)

    this._bindEvents()
  }

  nextPage () {
    this.collection.reset()
    this.collection.getNextPage()
  }

  previousPage () {
    this.collection.reset()
    this.collection.getPreviousPage()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get childView () {
    return BlogSummaryView
  }

  get childViewContainer () {
    return 'ol'
  }

  get tagName () {
    return 'main'
  }
}
