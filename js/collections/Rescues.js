import moment from 'moment'

import BaseModel from 'models/Base'
import APICollection from 'collections/API'
import RatsCollection from 'collections/Rats'





export default class Rescues extends APICollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('createdAt')
  }

  parseRecords (response) {
    let allRats = Backbone.Radio.channel('application').request('rats')

    response.data.forEach(rescue => {
      let rescueRats = rescue.rats

      rescue.rats = new RatsCollection
      rescue.createdAt = new moment(rescue.createdAt)
      rescue.updatedAt = new moment(rescue.updatedAt)
      rescue.date = rescue.createdAt.fromNow()

      rescueRats.forEach(id => {
        let idHash = {
          firstLimpet: rescue.firstLimpet === id,
          id: id
        }

        let ratModel = allRats.findWhere(idHash)

        if (!ratModel) {
          ratModel = allRats.add(idHash)
        }

        rescue.rats.add(ratModel)
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

  get url () {
    return '/api/rescues'
  }
}
