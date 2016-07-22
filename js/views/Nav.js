import Backbone from 'backbone'

import template from 'templates/Nav.hbs'





export default class Nav extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get tagName () {
    return 'nav'
  }

  get template () {
    return template
  }
}
