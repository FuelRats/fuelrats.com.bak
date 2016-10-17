import BaseModel from 'models/Base'
import Rat from 'models/Rat'
import APICollection from 'collections/API'





export default class Rats extends APICollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (models, options) {
    super(models, options)

    this.state = {
      order: -1,
      sortKey: 'CMDRname'
    }
  }

  parseRecords (response) {
    return response.data
  }





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
