import BaseLayoutView from 'views/BaseLayoutView'
//import RescueListView from 'views/RescueList'

import template from 'templates/RatAdminRow.hbs'





export default class RatAdminRow extends BaseLayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model.get('rescues'), 'change', this._showRescues)
  }

  _showRescues () {
    let rescues = this.model.get('rescues')

    if (rescues.length) {
      this.getRegion('rescues').show(new RescueListView({
        collection: rescues
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

//  initialize () {
//    this._bindEvents()
//  }
//
//  onAttach () {
//    super.onAttach()
//
//    this._showRescues()
//  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get className () {
    return 'rat'
  }

  get regions () {
    return this._regions || (this._regions = {
      rescues: '.rescues'
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
