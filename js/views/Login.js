import Backbone from 'backbone'
import Handlebars from 'handlebars'

import template from 'templates/Login.hbs'





export default class Login extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  onRender () {
    this.stickit()
  }

  onSubmit (event) {
    this.model.login()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

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
    return 'main'
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
