import Route from '../Route'
import PaperworkView from 'views/Paperwork'
import RescueModel from 'models/Rescue'





export default class Paperwork extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/
  loadData (params) {
    return new Promise((resolve, reject) => {
      let rescues = this.appChannel.request('rescues')

      if (params.id) {
        this.viewOptions.model = rescues.findWhere({id: params.id})

        if (this.viewOptions.model) {
          resolve()

        } else {
          this.viewOptions.model = rescues.add({id: params.id})
          this.viewOptions.model.fetch({
            error: reject,
            success: resolve
          })
        }

      } else {
        this.viewOptions.model = rescues.add({})

        resolve()
      }
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get replaceElement () {
    return false
  }

  get title () {
    return 'Paperwork'
  }

  get view () {
    return PaperworkView
  }
}
