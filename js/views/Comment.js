import Backbone from 'backbone'

import template from 'templates/Comment.hbs'





export default class Comment extends Backbone.Marionette.ItemView {

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
