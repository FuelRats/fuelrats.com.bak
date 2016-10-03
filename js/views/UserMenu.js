import Backbone from 'backbone'

import LoginView from 'views/Login'
import template from 'templates/UserMenu.hbs'





export default class UserMenu extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this.render)

    this.routerChannel.on('before:navigate', () => {
      if (window.location.pathname.indexOf('/login') === 0) {
        this.el.setAttribute('data-hidden', '')
      } else {
        this.el.removeAttribute('data-hidden')
      }
    })
  }

  _showLogin () {
    this.appChannel.request('dialog:show', {
      body: new LoginView({
        model: this.model
      }),
      showMenu: false,
      title: 'Login'
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
    return 'user-menu'
  }

  get events () {
    return this._events || (this._events = {
      'click button.login': '_showLogin'
    })
  }

  get model () {
    return this.appChannel.request('user')
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }

  get tagName () {
    return 'div'
  }

  get template () {
    return template
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }
}
