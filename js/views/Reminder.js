import Backbone from 'backbone'
import BaseLayoutView from 'views/BaseLayoutView'

import template from 'templates/Reminder.hbs'





export default class Reminder extends Backbone.Marionette.ItemView {

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

  get tagName () {
    return 'li'
  }
}
