import moment from 'moment'

import BaseModel from './Base'





export default class Rat extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'sync', () => {
      this.set({
        loaded: true
      })
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._bindEvents()
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
      loading: false
    }
  }

  get urlRoot () {
    return '/api/rats/'
  }
}
