import Route from '../Route'
import UserListView from 'views/UserList'
import UsersCollection from 'collections/Users'





export default class UserList extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/
  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.collection = this.appChannel.request('users')
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
    return 'Users'
  }

  get view () {
    return UserListView
  }
}
