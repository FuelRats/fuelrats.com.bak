import Backbone from 'backbone'

import template from 'templates/RatSummary.hbs'





export default class RatSummary extends Backbone.Marionette.ItemView {

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
