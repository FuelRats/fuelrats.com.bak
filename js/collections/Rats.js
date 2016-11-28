import BaseModel from 'models/Base'
import Rat from 'models/Rat'
import APICollection from 'collections/API'





export default class Rats extends APICollection {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get comparator () {
    return 'CMDRname'
  }

  get model () {
    return Rat
  }

  get url () {
    return '/api/rats'
  }
}
