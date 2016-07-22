import Route from '../Route'
import HomeView from 'views/Home'





export default class Home extends Route {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Home'
  }

  get view () {
    return HomeView
  }
}
