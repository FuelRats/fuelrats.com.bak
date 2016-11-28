import BaseModel from 'models/Base'
import User from 'models/User'
import PageableAPICollection from 'collections/PageableAPI'
import RatsCollection from 'collections/Rats'





export default class PageableUsers extends PageableAPICollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parseRecords (response) {
    let allRats = Backbone.Radio.channel('application').request('rats')

    response.data.forEach(user => {
      let userRats = user.CMDRs

      user.CMDRs = new RatsCollection

      userRats.forEach(id => {
        let idHash = {
          id: id
        }

        let ratModel = allRats.findWhere(idHash)

        if (!ratModel) {
          ratModel = allRats.add(idHash)
        }

        user.CMDRs.add(ratModel)
      })
    })

    allRats.fetch({
      bulk: true
    })

    return response.data
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get comparator () {
    return 'email'
  }

  get model () {
    return User
  }

  get url () {
    return '/api/users'
  }
}
