import Backbone from 'backbone'

import BaseModel from 'models/Base'





export default class Wordpress extends Backbone.PageableCollection {

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

  comparator (model) {
    return -model.get('date')
  }

  initialize () {
    this._bindEvents()
  }

  parseState (response, queryParams, state, options) {
    let totalRecords = parseInt(options.xhr.getResponseHeader('x-wp-total'))

    return {
      totalRecords: totalRecords
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get data () {
    return this._data || (this._data = new BaseModel)
  }

  get state () {
    return this._state || (this._state = {
      firstPage: 1,
      pageSize: 10
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set state (value) {
    this._state = value
  }
}
