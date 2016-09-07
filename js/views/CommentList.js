import Backbone from 'backbone'

import CommentSummaryView from 'views/CommentSummary'
import template from 'templates/CommentList.hbs'





export default class CommentList extends Backbone.Marionette.CompositeView {

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
    return CommentSummaryView
  }

  get tagName () {
    return 'ol'
  }
}
