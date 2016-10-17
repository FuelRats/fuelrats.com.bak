import moment from 'moment'

import RatsCollection from 'collections/Rats'
import BaseModel from './Base'





export default class Rescue extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'change:createdAt', this._updateDate)
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





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

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

    if (!(response.rats instanceof RatsCollection)) {
      let allRats = this.appChannel.request('rats')

      if (!Array.isArray(response.rats)) {
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
    }

    response.createdAt = new moment(response.createdAt)
    response.updatedAt = new moment(response.updatedAt)

    return response
  }
}
