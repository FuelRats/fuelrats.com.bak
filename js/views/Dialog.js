import Backbone from 'backbone'
import Handlebars from 'handlebars'

import BaseLayoutView from 'views/BaseLayoutView'
import template from 'templates/Dialog.hbs'





export default class Dialog extends BaseLayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.el.addEventListener('close', () => {
      this.trigger('close')
    })

    this.el.addEventListener('cancel', () => {
      this.trigger('cancel')
    })

    this.appChannel.reply('dialog', this.show.bind(this))
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  cancel () {
    this.trigger('cancel')
    this.el.close()
  }

  close () {
    this.el.close()
  }

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  initialize () {
    this._bindEvents()
  }

  show (options) {
    if (typeof options.showMenu !== 'boolean') {
      options.showMenu = true
    }

    this.model.clear()
    this.model.set(options)
    this.render()

    if (options.body instanceof Backbone.View) {
      this.getRegion('content').show(options.body)
    }

    this.el.showModal()
    this.ui.confirm.focus()

    return new Promise((resolve, reject) => {
      this.once('close', resolve)
      this.once('cancel', reject)
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get events () {
    return this._events || (this._events = {
      'click button[name=cancel]': 'cancel',
      'click button[name=confirm]': 'close'
    })
  }

  get model () {
    return this._model || (this._model = new Backbone.Model)
  }

  get regions () {
    return this._regions || (this._regions = {
      content: '.content'
    })
  }

  get tagName () {
    return 'dialog'
  }

  get ui () {
    return this._ui || (this._ui = {
      'confirm': 'button[name=confirm]'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }

  set model (value) {
    this._model = value
  }

  set regions (value) {
    this._regions = value
  }

  set ui (value) {
    this._ui = value
  }
}
