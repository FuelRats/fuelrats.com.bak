import Backbone from 'backbone'

import RescueAdminRowView from 'views/RescueAdminRow'
import template from 'templates/RescueAdminTable.hbs'





export default class RescueAdminTable extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get childView () {
    return RescueAdminRowView
  }

  get childViewContainer () {
    return '.rescues tbody'
  }

  get tagName () {
    return 'main'
  }
}
