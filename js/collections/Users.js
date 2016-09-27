import User from 'models/User'

import BaseCollection from 'collections/Base'
import CMDRsCollection from 'collections/CMDRs'





export default class Users extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    let allCMDRs = Backbone.Radio.channel('application').request('CMDRs')

    response.data.forEach(user => {
      let userCMDRs = user.CMDRs

      user.CMDRs = new CMDRsCollection

      userCMDRs.forEach(id => {
        let idHash = {
          id: id
        }

        let CMDRModel = allCMDRs.findWhere(idHash)

        if (!CMDRModel) {
          CMDRModel = allCMDRs.add(idHash)
        }

        user.CMDRs.add(CMDRModel)
      })
    })

    allCMDRs.fetch({
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
