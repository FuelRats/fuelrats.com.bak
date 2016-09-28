import Backbone from 'backbone'

import RatSummaryView from 'views/RatSummary'
import template from 'templates/RatList.hbs'





export default class RatList extends Backbone.Marionette.CompositeView {

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
    Public Methods
  \******************************************************************************/

  get childView () {
    return RatSummaryView
  }

  get className () {
    return 'rats-list'
  }

  get tagName () {
    return 'ul'
  }
}
