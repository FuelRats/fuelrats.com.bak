import Backbone from 'backbone'

import template from 'templates/Paperwork.hbs'





export default class Paperwork extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this._toggleSubmitButton)
  }

  _toggleSubmitButton () {
    let submitButton = this.el.querySelector('button[type=submit]')

    if (this.isComplete()) {
      submitButton.removeAttribute('disabled')
    } else {
      submitButton.setAttribute('disabled', '')
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

  isComplete () {
    return true
  }

  onRender () {
    this.stickit()
  }

  onSubmit (event) {
    console.log('Submitted!', this.model.toJSON())

//    this.model.save()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get bindings () {
    return {
      '#rats': 'rats',
      '#codeRed': 'codeRed',
      '#firstLimpet': 'firstLimpet',
      '#notes': 'notes',
      '#platform': 'platform',
      '#successful': 'successful',
      '#system': 'system'
    }
  }

  get events () {
    return this._events || (this._events = {
      'click button[type=submit]': 'onSubmit'
    })
  }

  get tagName () {
    return 'form'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }
}
