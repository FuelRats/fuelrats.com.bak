import Route from '../Route'
import AboutView from 'views/About'





export default class About extends Route {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'About Trezy'
  }

  get view () {
    return AboutView
  }
}
