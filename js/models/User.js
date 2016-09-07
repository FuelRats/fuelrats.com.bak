import BaseModel from './Base'





export default class User extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  login () {
    return new Promise((resolve, reject) => {
      let user = JSON.parse(localStorage.getItem('user'))

      if (user) {
        this.set({
          loggedIn: true,
          loggingIn: false,
          password: ''
        })

        return resolve()
      }

      $.ajax({
        data: {
          email: this.get('email'),
          password: this.get('password')
        },
        error: reject,
        method: 'post',
        success: (response, status, xhr) => {
          this.set({
            loggedIn: true,
            loggingIn: false,
            password: ''
          })

          if (window.location.search) {
            let query = window.location.search.substr(1).split('&')
            let queryHash = {}

            query.forEach((item, index, array) => {
              item = item.split('=')
              queryHash[item[0]] = item[1]
            })

            if (queryHash.redirect) {
              window.location = queryHash.redirect
            }
          }
        },
        url: 'https://api.fuelrats.com/login'
      })
    })
  }

  logout () {
    this.set({
      email: '',
      loggedIn: false
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      email: '',
      loggedIn: false,
      loggingIn: false,
      password: ''
    }
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }
}
