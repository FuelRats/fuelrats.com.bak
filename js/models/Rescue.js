import moment from 'moment'

import BaseModel from './Base'





export default class Rescue extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'change:createdAt', this._updateDate)
  }

  _updateDate () {
    let createdAt = this.get('createdAt')

    if (createdAt) {
      this.set('date', createdAt.calendar())
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._updateDate()
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      loaded: false
    }
  }
}
