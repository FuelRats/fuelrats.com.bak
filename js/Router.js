import Backbone from 'backbone'





export default class Router extends Backbone.BaseRouter {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _authenticate (routeData) {
    if (routeData.linked.requireAuthentication) {
      let user = this.appChannel.request('user')

      if (!user.get('loggedIn')) {
        return user.login()

      } else {
        return Promise.resolve()
      }

    } else {
      return Promise.resolve()
    }
  }

  _bindEvents () {
    this.channel.on('route', this.navigate)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onNavigate (routeData) {
    this._authenticate(routeData)
    .then(() => {
      this.channel.trigger('before:navigate', routeData.linked)

      routeData.linked.show(routeData.params)
      .then(() => {
        this.channel.trigger('navigate', routeData.linked)
      })
      .catch((error) => {
        console.error(error)
        this.channel.trigger('error')
      })
    })
    .catch(error => {
      return this.channel.request('route', '/login')
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get channel () {
    return Backbone.Radio.channel('router')
  }
}
