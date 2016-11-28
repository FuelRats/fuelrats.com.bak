import _ from 'underscore'
import Backbone from 'backbone'

import BaseModel from 'models/Base'





export default class API extends Backbone.Collection {

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

    super.fetch(options)
  }

  initialize () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }
}
