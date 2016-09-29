import config from '../../config.json'

import Rat from 'models/Rat'
import BaseCollection from 'collections/Base'





export default class Rats extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    return response.data
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Rat
  }

  get url () {
    return '/api/rats'
  }
}
