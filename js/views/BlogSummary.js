import Backbone from 'backbone'

import template from 'templates/BlogSummary.hbs'





export default class BlogSummary extends Backbone.Marionette.ItemView {

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
