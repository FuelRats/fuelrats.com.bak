import Backbone from 'backbone'

import template from 'templates/UserMenu.hbs'





export default class UserMenu extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow () {}





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get className () {
    return 'user'
  }

  get tagName () {
    return 'menu'
  }

  get template () {
    return template
  }
}
