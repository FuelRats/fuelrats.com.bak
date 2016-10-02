import BaseModel from 'models/Base'
import Rat from 'models/Rat'
import APICollection from 'collections/API'





export default class Rats extends APICollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    this.state = {
      order: -1,
      sortKey: 'CMDRname'
    }
  }

  parseRecords (response) {
//    let allRats = Backbone.Radio.channel('application').request('rats')
//
//    response.data.forEach(user => {
//      let userRats = user.CMDRs
//
//      user.CMDRs = new RatsCollection
//
//      userRats.forEach(id => {
//        let idHash = {
//          id: id
//        }
//
//        let ratModel = allRats.findWhere(idHash)
//
//        if (!ratModel) {
//          ratModel = allRats.add(idHash)
//        }
//
//        user.CMDRs.add(ratModel)
//      })
//    })
//
//    allRats.fetch({
//      bulk: true
//    })

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
