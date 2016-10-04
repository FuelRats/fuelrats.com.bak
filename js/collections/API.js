import Backbone from 'backbone'

import BaseModel from 'models/Base'





export default class API extends Backbone.PageableCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.data.listenTo(this, 'pageable:state:change sync', this._updateData.bind(this))
  }

  _updateData () {
    let currentPage = this.state.currentPage
    let lastPage = this.state.lastPage
    let firstPage = this.state.firstPage

    this.data.set({
      currentPage: currentPage,
      hasMultiplePages: this.hasNextPage() || this.hasPreviousPage(),
      lastPage: lastPage,
      nextPage: this.hasNextPage() ? currentPage + 1 : false,
      previousPage: this.hasPreviousPage() ? currentPage - 1 : false
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  fetch (options) {
    options = options || {}

    if (options.bulk) {
      let ids = []

      this.forEach(model => {
        if (!model.get('loaded')) {
          ids.push(model.get('id'))
        }
      })

      options.data = {
        id: ids,
        limit: ids.length
      }
    }

    super.fetch(options)
  }

  initialize () {
    this._bindEvents()
  }

  parseState (response, queryParams, state, options) {
    let totalRecords = response.meta.total

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

  get queryParams () {
    return this._queryParams || (this._queryParams = {
      currentPage: 'page',
      directions: {
        '-1': 'ASC',
        '1': 'DESC'
      },
      order: 'direction',
      pageSize: 'limit',
      sortKey: 'order',
      totalPages: '',
      totalRecords: ''
    })
  }

  get state () {
    return this._state || (this._state = {
      firstPage: 1,
      order: 1,
      pageSize: 100,
      sortKey: 'createdAt'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set queryParams (value) {
    this._queryParams = value
  }

  set state (value) {
    if (this._state) {
      let keys = Object.keys(value)

      keys.forEach(key => {
        this._state[key] = value[key]
      })

    } else {
      this._state = value
    }
  }
}
