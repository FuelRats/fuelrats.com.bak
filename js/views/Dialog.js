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

    this.appChannel.reply('dialog:close', this.close.bind(this))
    this.appChannel.reply('dialog:loading', this.showLoader.bind(this))
    this.appChannel.reply('dialog:loaded', this.hideLoader.bind(this))
    this.appChannel.reply('dialog:show', this.show.bind(this))
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

  hideLoader () {
    this.el.querySelector('.loading').setAttribute('data-hidden', '')
  }

  initialize () {
    this._bindEvents()
  }

  show (options) {
    options = options || {}

    options.showClose = options.hasOwnProperty('showClose') ? options.showClose : true
    options.showHeader = options.hasOwnProperty('showHeader') ? options.showHeader : true
    options.showMenu = options.hasOwnProperty('showMenu') ? options.showMenu : true

    this.model.clear()
    this.model.set(options)
    this.render()

    if (options.body instanceof Backbone.View) {
      this.getRegion('content').show(options.body)
    }

    this.el.showModal()

    return new Promise((resolve, reject) => {
      this.once('close', resolve)
      this.once('cancel', reject)
    })
  }

  showLoader () {
    this.el.querySelector('.loading').removeAttribute('data-hidden')
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
      'click button[name=confirm]': 'close',
      'click button.close': 'close'
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
