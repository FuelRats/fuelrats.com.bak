import config from '../../config.json'
import BaseCollection from 'collections/Base'
import Rat from 'models/Rat'





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
