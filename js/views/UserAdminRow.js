import BaseLayoutView from 'views/BaseLayoutView'

import RatListView from 'views/RatList'

import template from 'templates/UserAdminRow.hbs'





export default class UserAdminRow extends BaseLayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model.get('rats'), 'change', this._showRats)
  }

  _showRats () {
    let rats = this.model.get('rats')

    if (rats && rats.length) {
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
    return 'user'
  }

  get regions () {
    return this._regions || (this._regions = {
      rats: '.rats'
    })
  }

  get tagName () {
    return 'tr'
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
