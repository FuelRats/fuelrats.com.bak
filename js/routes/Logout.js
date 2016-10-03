import Route from '../Route'





export default class Logout extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow (params) {
    this.model.logout()
    this.routerChannel.request('route', '/')
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Backbone.Radio.channel('application').request('user')
  }

  get title () {
    return 'Logout'
  }
}
