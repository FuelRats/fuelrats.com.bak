import moment from 'moment'

import RescueModel from 'models/Rescue'
import PageableAPICollection from 'collections/PageableAPI'





export default class PageableRescues extends PageableAPICollection {

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
