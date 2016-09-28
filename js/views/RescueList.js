import Backbone from 'backbone'

import RescueSummaryView from 'views/RescueSummary'
import template from 'templates/RescueList.hbs'





export default class RescueList extends Backbone.Marionette.CompositeView {

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
    return RescueSummaryView
  }

  get childViewContainer () {
    return '.rescue-list tbody'
  }

  get tagName () {
    return 'main'
  }
}
