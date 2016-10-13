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
      if (!moment.isMoment(createdAt)) {
        createdAt = moment(createdAt)

        this.set('createdAt', createdAt, {
          silent: true
        })
      }

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

  parse (response) {
    return response.data
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
