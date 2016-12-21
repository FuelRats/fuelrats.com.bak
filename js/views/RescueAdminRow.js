import BaseLayoutView from 'views/BaseLayoutView'
import RatListView from 'views/RatList'

import template from 'templates/RescueAdminRow.hbs'





export default class RescueAdminRow extends BaseLayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model.get('rats'), 'change sync', this._showRats)
  }

  _handleEdit (event) {
    let id = event.target.getAttribute('data-id')
    this.routerChannel.request('route', '/paperwork/' + id)
  }

  _handleView (event) {
    let id = event.target.getAttribute('data-id')
    this.routerChannel.request('route', '/rescues/' + id)
  }

  _showRats () {
    let rats = this.model.get('rats')

    if (rats.length) {
      this.getRegion('rats').show(new RatListView({
        collection: rats
      }))
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      events: {
        'click [data-action=edit]': '_handleEdit',
        'click [data-action=view]': '_handleView'
      },
      template: template
    })

    super(options)
  }

  initialize () {
    this._bindEvents()
  }

  onAttach () {
    super.onAttach()

    this._showRats()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get className () {
    return 'rescue'
  }

  get regions () {
    return this._regions || (this._regions = {
      rats: '.rats'
    })
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }

  get tagName () {
    return 'tr'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
