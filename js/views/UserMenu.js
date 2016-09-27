import Backbone from 'backbone'

import template from 'templates/UserMenu.hbs'





export default class UserMenu extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.routerChannel.on('before:navigate', () => {
      if (window.location.pathname.indexOf('/login') === 0) {
        this.el.setAttribute('data-hidden', '')
      } else {
        this.el.removeAttribute('data-hidden')
      }
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  initialize () {
    this._bindEvents()
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

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }

  get tagName () {
    return 'menu'
  }

  get template () {
    return template
  }
}
