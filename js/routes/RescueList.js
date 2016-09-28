import Route from '../Route'
import RescueListView from 'views/RescueList'
import RescuesCollection from 'collections/Rescues'





export default class RescueList extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/
  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.collection = this.appChannel.request('rescues')
      this.viewOptions.model = this.viewOptions.collection.data

      this.viewOptions.collection.getPage(params.page ? parseInt(params.page) : 1, {
        error: reject,
        success: resolve
      })
    })
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get replaceElement () {
    return true
  }

  get requireAuthentication () {
    return true
  }

  get title () {
    return 'Rescues'
  }

  get view () {
    return RescueListView
  }
}
