import Route from '../Route'
import RatAdminTableView from 'views/RatAdminTable'





export default class RatAdminTable extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/
  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.collection = this.appChannel.request('rats')
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
    return 'Rats'
  }

  get view () {
    return RatAdminTableView
  }
}
