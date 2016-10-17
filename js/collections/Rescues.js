import moment from 'moment'

import RescueModel from 'models/Rescue'
import APICollection from 'collections/API'
import RatsCollection from 'collections/Rats'





export default class Rescues extends APICollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('createdAt')
  }

  parseRecords (response) {
    response.data.forEach(datum => {
      datum.parsed = true
    })

    return response.data
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return RescueModel
  }

  get url () {
    return '/api/rescues'
  }
}
