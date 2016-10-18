import Backbone from 'backbone'

import template from 'templates/Reminders.hbs'





export default class Reminders extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
//    this.appChannel.reply('dialog:close', this.close.bind(this))
//    this.appChannel.reply('dialog:loading', this.showLoader.bind(this))
//    this.appChannel.reply('dialog:loaded', this.hideLoader.bind(this))
//    this.appChannel.reply('dialog:show', this.show.bind(this))
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

 constructor (options) {
   options = _.extend(options || {}, {
     events: {
       'click button.minimize': 'minimize'
     },
     template: template
   })

   super(options)
 }

  initialize () {
    this._bindEvents()
  }

  minimize () {
    this.el.classList.toggle('minimize')
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get className () {
    return 'panel reminders'
  }

  get tagName () {
    return 'div'
  }

  get template () {
    return template
  }
}
