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
    this.routerChannel.reply('route', (route) => {
      this.navigate(route, {
        trigger: true
      })
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._bindEvents()
  }

  onNavigate (routeData) {
    this._authenticate(routeData)
    .then(() => {
      this.routerChannel.trigger('before:navigate', routeData.linked)

      routeData.linked.show(routeData.params)
      .then(() => {
        this.routerChannel.trigger('navigate', routeData.linked)
      })
      .catch((error) => {
        console.error(error)
        this.routerChannel.trigger('error')
      })
    })
    .catch(error => {
      return this.routerChannel.request('route', '/login')
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }
}
