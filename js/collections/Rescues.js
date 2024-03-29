import moment from 'moment'

import RescueModel from 'models/Rescue'
import APICollection from 'collections/API'





export default class Rescues extends APICollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('createdAt')
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
