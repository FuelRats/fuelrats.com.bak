import Backbone from 'backbone'

import BlogSummaryView from 'views/BlogSummary'
import template from 'templates/BlogList.hbs'





export default class BlogList extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
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
