import Backbone from 'backbone'

import template from 'templates/UserMenu.hbs'





export default class UserMenu extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/





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

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get className () {
    return 'user'
  }

  get model () {
    return this.appChannel.request('user')
  }

  get tagName () {
    return 'menu'
  }

  get template () {
    return template
  }
}
