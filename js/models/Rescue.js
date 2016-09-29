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
    this.set('date', this.get('createdAt').calendar())
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
