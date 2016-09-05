import Backbone from 'backbone'

import template from 'templates/Leaderboard.hbs'





export default class Leaderboard extends Backbone.Marionette.ItemView {

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

  get className () {
    return 'page'
  }

  get tagName () {
    return 'main'
  }
}
