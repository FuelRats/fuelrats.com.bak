import Backbone from 'backbone'

import template from 'templates/CMDRSummary.hbs'





export default class CMDRSummary extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get tagName () {
    return 'li'
  }

  get template () {
    return template
  }
}
