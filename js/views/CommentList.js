import Backbone from 'backbone'

import CommentView from 'views/Comment'

import template from 'templates/CommentList.hbs'





export default class CommentList extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this.render)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      events: {
        'click #next': 'nextPage',
        'click #previous': 'previousPage'
      },
      template: template
    })

    super(options)

    this._bindEvents()
  }

  nextPage () {
    this.collection.getNextPage()
  }

  previousPage () {
    this.collection.getPreviousPage()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get childViewContainer () {
    return 'ol'
  }

  get childView () {
    return CommentView
  }

  get className () {
    return 'comments'
  }

  get events () {
    return this._events || (this._events = {
      'click #next': 'nextPage',
      'click #previous': 'previousPage'
    })
  }

  get tagName () {
    return 'section'
  }

  get ui () {
    return this._ui || (this._ui = {
      next: '#next',
      previous: '#previous'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }

  set ui (value) {
    this._ui = value
  }
}
