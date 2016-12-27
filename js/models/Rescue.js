import _ from 'underscore'
import moment from 'moment'
import RatsCollection from 'collections/Rats'
import RatModel from 'models/Rat'
import BaseModel from './Base'





export default class Rescue extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'change:createdAt', this._updateDate)
    this.listenTo(this, 'change:platform', this._updatePlatform)
  }

  _getRats () {
    this.appChannel.request('rats').fetch({
      bulk: true,
      remove: false
    })
  }

  _updateDate () {
    let createdAt = this.get('createdAt')

    if (createdAt) {
      if (!moment.isMoment(createdAt)) {
        createdAt = moment(createdAt)

        this.set('createdAt', createdAt, {
          silent: true
        })
      }

      this.set('date', createdAt.calendar())
    }
  }

  _updatePlatform () {
    let safePlatform

    switch (this.get('platform')) {
      case 'pc':
        safePlatform = 'PC'
        break
      case 'xb':
        safePlatform = 'Xbox One'
        break
    }

    this.set('safePlatform', safePlatform)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  fetch (options) {
    if (this.rats) {
      options.data = _.extend(options.data || {}, {
        rats: this.rats
      })
    }

    super.fetch(options)
  }

  initialize () {
    this._updateDate()
    this._getRats()
    this._bindEvents()
  }

  parse (response) {
    if (!response.parsed) {
      response = response.data
    } else {
      delete response.parsed
    }

    let allRats = this.appChannel.request('rats')

    if (!response.rats) {
      response.rats = []
    }

    response.rats = new RatsCollection(response.rats.map(id => {
      let rat = allRats.findWhere({
        id: id
      })

      if (rat) {
        return rat
      }

      return allRats.add({
        id: id
      })
    }))

    if (response.firstLimpet) {
      response.firstLimpet = new RatModel({id: response.firstLimpet})
    }

    response.createdAt = new moment(response.createdAt)
    response.updatedAt = new moment(response.updatedAt)

    return response
  }

  toJSON (options) {
    let clone = super.toJSON(options)

    // Map the rats collection to an array of IDs
    clone.rats = clone.rats.toJSON().map(model => model.id)

    // Convert the firstLimpet field into just an ID if it's been set
    if (clone.firstLimpet && clone.firstLimpet.id) {
      clone.firstLimpet = clone.firstLimpet.id
    }

    return clone
  }

  toViewJSON (options) {
    return super.toJSON(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get defaults () {
    return {
      active: false,
      codeRed: false,
      firstLimpet: null,
      notes: '',
      open: false,
      platform: 'pc',
      rats: new RatsCollection,
      saving: false,
      successful: true,
      system: '',
      title: ''
    }
  }

  get rats () {
    return this._rats
  }

  get urlRoot () {
    return '/api/rescues/'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set rats (ids) {
    if (!Array.isArray(ids)) {
      ids = [ids]
    }

    this._rats = ids
  }
}
