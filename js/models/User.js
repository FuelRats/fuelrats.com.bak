import cookie from 'cookie'

import BaseModel from './Base'





export default class User extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _checkCookie () {
    let userCookie = cookie.get('user.id')

    if (userCookie) {
      return this.set({
        id: userCookie,
        loggedIn: true
      })
    }
  }





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

          cookie.set({
            'user.id': response.data.id
          }, {
            path: '/'
          })

          // Handle redirect query parameters
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
        url: '/api/login'
      })
    })
  }

  logout () {
    this.set({
      email: '',
      loggedIn: false
    })

    cookie.remove('user.id')
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      CMDRs: [],
      email: '',
      loggedIn: false,
      loggingIn: false,
      name: 'Trezy',
      password: ''
    }
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }
}
