import Backbone from 'backbone'

import template from 'templates/UserSummary.hbs'





export default class UserSummary extends Backbone.Marionette.ItemView {

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
