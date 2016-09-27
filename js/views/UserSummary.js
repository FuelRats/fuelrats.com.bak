import BaseLayoutView from 'views/BaseLayoutView'

import CMDRListView from 'views/CMDRList'

import template from 'templates/UserSummary.hbs'





export default class UserSummary extends BaseLayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model.get('CMDRs'), 'change', this._showCMDRs)
  }

  _showCMDRs () {
    let CMDRs = this.model.get('CMDRs')

    if (CMDRs.length) {
      this.getRegion('CMDRs').show(new CMDRListView({
        collection: CMDRs
      }), {
        replaceElement: true
      })
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

    this._showCMDRs()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get className () {
    return 'user'
  }

  get regions () {
    return this._regions || (this._regions = {
      CMDRs: '.CMDRs'
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
