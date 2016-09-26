import BaseCollection from 'collections/Base'
import User from 'models/User'





export default class Users extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('date')
  }

  parse (response) {
    return response.data
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return User
  }

  get url () {
    return '/api/users'
  }
}
