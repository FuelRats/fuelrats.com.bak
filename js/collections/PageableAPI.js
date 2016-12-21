import _ from 'underscore'
import Backbone from 'backbone'
import PaginationDataModel from 'models/PaginationData'
import BaseModel from 'models/Base'





export default class PageableAPI extends Backbone.PageableCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'sync', this._syncModels.bind(this))
    this.listenTo(this, 'request', this._requestModels.bind(this))
  }

  _requestModels () {
    this.models.forEach(model => {
      model.set('loading', true)
    })
  }

  _syncModels () {
    this.models.forEach(model => {
      model.set('loading', false)
      model.set('loaded', true)
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (models, options) {
    super(models, options)

    if (options) {
      console.log(options)
    }
  }

  fetch (options) {
    options = options || {}

    if (options.bulk) {
      let ids = []

      this.forEach(model => {
        if (!model.get('loaded') && !model.get('loading')) {
          ids.push(model.get('id'))
        }

        model.set('loading', true)
      })

      if (!ids.length) {
        return
      }

      options.data = _.extend(options.data || {}, {
        id: ids,
        limit: ids.length
      })
    }

    options.data = _.extend(options.data || {}, this.filters)

    super.fetch(options)
  }

  initialize (models, options) {
    this._bindEvents()
  }

  parseState (response, queryParams, state, options) {
    let totalRecords = response.meta.total

    return {
      totalRecords: totalRecords
    }
  }

  setFilters (filters) {
    Object.keys(filters).forEach(key => {
      let filterValue = filters[key]

      if (filterValue === null) {
        delete this.filters[key]

      } else {
        this.filters[key] = filterValue
      }
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get data () {
    return this._data || (this._data = new PaginationDataModel({
      collection: this
    }))
  }

  get filters () {
    return this._filters || (this._filters = {})
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

  set filters (value) {
    this._filters = value
  }

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
