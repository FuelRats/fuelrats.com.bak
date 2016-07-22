import Backbone from 'backbone'

import template from 'templates/Tweet.hbs'





export default class Tweet extends Backbone.Marionette.ItemView {

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
