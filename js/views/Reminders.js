import Backbone from 'backbone'

import RescuesCollection from 'collections/Rescues'
import ReminderView from 'views/Reminder'
import template from 'templates/Reminders.hbs'





export default class Reminders extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.collection, 'add change remove', this.render)
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

  onBeforeRender () {
    this.rescues.reset(this.user.get('rescues').filter(rescue => {
      // The rescue is still open
      if (rescue.get('open')) {
        return false
      }

      // The rescue was successful but first limpet hasn't been assigned
      if (rescue.get('successful') && !rescue.get('firstLimpet')) {
        return true
      }

      // The rescue was unsuccessful but nobody has entered any notes
      if (!rescue.get('successful') && rescue.get('notes')) {
        return true
      }

      return false
    }))

    this.el.classList.toggle('hide', !this.collection.length)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get childView () {
    return ReminderView
  }

  get childViewContainer () {
    return '.content'
  }

  get className () {
    return 'hide panel reminders'
  }

  get rescues () {
    return this._rescues || (this._rescues = new RescuesCollection)
  }

  get tagName () {
    return 'div'
  }

  get template () {
    return template
  }

  get user () {
    return this.appChannel.request('user')
  }
}
