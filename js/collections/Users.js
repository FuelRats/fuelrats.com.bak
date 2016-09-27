import Backbone from 'backbone'

import BaseModel from 'models/Base'
import User from 'models/User'
import CMDRsCollection from 'collections/CMDRs'





export default class Users extends Backbone.PageableCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.data.listenTo(this, 'sync', this._updateData.bind(this))
  }

  _updateData () {
    this.data.set({
      nextPage: this.hasNextPage() ? this.state.currentPage + 1 : null,
      previousPage: this.hasPreviousPage() ? this.state.currentPage - 1 : null
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._bindEvents()
  }

  parse (response) {
    let allCMDRs = Backbone.Radio.channel('application').request('CMDRs')

    response.data.forEach(user => {
      let userCMDRs = user.CMDRs

      user.CMDRs = new CMDRsCollection

      userCMDRs.forEach(id => {
        let idHash = {
          id: id
        }

        let CMDRModel = allCMDRs.findWhere(idHash)

        if (!CMDRModel) {
          CMDRModel = allCMDRs.add(idHash)
        }

        user.CMDRs.add(CMDRModel)
      })
    })

    allCMDRs.fetch({
      bulk: true
    })

    return response.data
  }

  parseState (response, queryParams, state, options) {
    let totalRecords = response.meta.links.total

    return {
      totalRecords: totalRecords
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get comparator () {
    return 'email'
  }

  get data () {
    return this._data || (this._data = new BaseModel)
  }

  get model () {
    return User
  }

  get queryParams () {
    return this._queryParams || (this._queryParams = {
      currentPage: 'offset',
      pageSize: 'limit'
    })
  }

  get state () {
    return this._state || (this._state = {
      currentPage: 1,
      firstPage: 1,
      pageSize: 100
    })
  }

  get url () {
    return '/api/users'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set queryParams (value) {
    this._queryParams = value
  }

  set state (value) {
    this._state = value
  }
}
