import Backbone from 'backbone'

import CMDRSummaryView from 'views/CMDRSummary'
import template from 'templates/CMDRList.hbs'





export default class CMDRList extends Backbone.Marionette.CompositeView {

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
    return CMDRSummaryView
  }

  get className () {
    return 'CMDRs'
  }

  get tagName () {
    return 'ul'
  }
}
