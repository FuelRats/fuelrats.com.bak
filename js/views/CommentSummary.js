import Backbone from 'backbone'

import template from 'templates/CommentSummary.hbs'





export default class CommentSummary extends Backbone.Marionette.ItemView {

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
