import Backbone from 'backbone'

import ReminderView from 'views/Reminder'
import template from 'templates/Reminders.hbs'





export default class Reminders extends Backbone.Marionette.CompositeView {

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

  minimize () {
    this.el.classList.toggle('minimize')
  }

  onBeforeRender () {
    this.collection = this.collection.filter((rescue) => {
      let needsUpdate = false

      // Check if the paperwork needs some love
      // The rescue was successful but first limpet hasn't been assigned
      needsUpdate = needsUpdate || (rescue.get('successful') && !rescue.get('firstLimpet'))

      // The rescue was unsuccessful but nobody has entered any notes
      needsUpdate = needsUpdate || (!rescue.get('successful') && !rescue.get('notes'))

      // If either of the above are true and the case is inactive
      needsUpdate = needsUpdate && !rescue.get('active')

      return needsUpdate
    })
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
    return 'panel reminders'
  }

  get tagName () {
    return 'div'
  }

  get template () {
    return template
  }
}
