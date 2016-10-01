import Backbone from 'backbone'

import UserAdminRowView from 'views/UserAdminRow'
import template from 'templates/UserAdminTable.hbs'





export default class UserAdminTable extends Backbone.Marionette.CompositeView {

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
    return UserAdminRowView
  }

  get childViewContainer () {
    return '.users tbody'
  }

  get tagName () {
    return 'main'
  }
}
