import moment from 'moment'

import BaseModel from './Base'





export default class Rat extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'change:platform', this._updatePlatform)
    this.listenTo(this, 'sync', () => {
      this.set({
        loaded: true
      })
    })
  }

  _updatePlatform () {
    let safePlatform

    switch (this.get('platform')) {
      case 'pc':
        safePlatform = 'PC'
        break
      case 'xb':
        safePlatform = 'Xbox One'
        this.set('isXbox', true)
        break
    }

    this.set('safePlatform', safePlatform)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._bindEvents()
    this._updatePlatform()
  }

  parse (response) {
    if (!response.parsed) {
      response = response.data
    } else {
      delete response.parsed
    }

    response.createdAt = new moment(response.createdAt)
    response.joined = new moment(response.joined)
    response.updatedAt = new moment(response.updatedAt)

    return response
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      loaded: false,
      loading: false,
      platform: 'pc',
      safePlatform: 'PC'
    }
  }

  get urlRoot () {
    return '/api/rats/'
  }
}
