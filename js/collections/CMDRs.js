import config from '../../config.json'
import BaseCollection from 'collections/Base'
import CMDR from 'models/CMDR'





export default class CMDRs extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  fetch (options) {
    options = options || {}

    let ids = []

    this.forEach(CMDR => {
      if (!CMDR.get('loaded')) {
        ids.push(CMDR.get('id'))
      }
    })

    if (options.bulk) {
      options.data = {
        id: ids,
        limit: ids.length
      }
    }

    super.fetch(options)
  }

  parse (response) {
    return response.data
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return CMDR
  }

  get url () {
    return '/api/rats'
  }
}
