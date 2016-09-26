import Backbone from 'backbone'

import UserSummaryView from 'views/UserSummary'
import template from 'templates/UserList.hbs'





export default class UserList extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.collection, 'change', this.render)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)

    this._bindEvents()
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  get childView () {
    return UserSummaryView
  }

  get tagName () {
    return 'ol'
  }
}
