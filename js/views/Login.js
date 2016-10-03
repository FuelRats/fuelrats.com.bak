import Backbone from 'backbone'

import template from 'templates/Login.hbs'





export default class Login extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this._toggleLoginButton)
  }

  _toggleLoginButton () {
    let loginButton = this.el.querySelector('button[type=submit]')

    if (this.model.get('email') && this.model.get('password')) {
      loginButton.removeAttribute('disabled')
    } else {
      loginButton.setAttribute('disabled', '')
    }
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

  onRender () {
    this.stickit()
  }

  onSubmit (event) {
    this.appChannel.request('dialog:loading')

    this.model.login()
    .then(() => {
      this.appChannel.request('dialog:close')
      this.appChannel.request('dialog:loaded')
    })
    .catch(() => {
      this.appChannel.request('dialog:loaded')
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get bindings () {
    return {
      '#password': 'password',
      '#email': 'email'
    }
  }

  get className () {
    return 'login'
  }

  get events () {
    return this._events || (this._events = {
      'click button[type=submit]': 'onSubmit'
    })
  }

  get tagName () {
    return 'form'
  }

  get ui () {
    return this._events || (this._events = {
      password: '#password',
      email: '#email'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }

  set ui (value) {
    this._ui = value
  }
}
