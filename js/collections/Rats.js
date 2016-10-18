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
    response.data.forEach(datum => {
      datum.parsed = true
    })

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
