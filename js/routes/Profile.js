import Route from '../Route'
import ProfileView from 'views/Profile'





export default class Profile extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      let user = this.appChannel.request('user')

      this.viewOptions.model = user

      resolve()
    })
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get replaceElement () {
    return false
  }

  get title () {
    return this.viewOptions.model.get('title')
  }

  get view () {
    return ProfileView
  }
}
