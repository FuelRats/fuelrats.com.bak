import cookie from 'cookie'

import BaseModel from './Base'
import CMDRsCollection from 'collections/CMDRs'





export default class User extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'change', () => {
      this._setPermissions()
      this.serializeUser()
    })
  }

  _setPermissions () {
    if (this.get('group') === 'admin') {
      this.set('isAdmin', true)
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  deserializeUser () {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      user.loggedIn = true
      this.set(user)
      this._setPermissions()
    }

    return
  }

  initialize () {
    this._bindEvents()
  }

  login () {
    if (cookie.cookie('connect.sid')) {
      let user = this.deserializeUser()
      this.set(user)
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        data: {
          email: this.get('email'),
          password: this.get('password')
        },
        error: reject,
        method: 'post',
        success: (response, status, xhr) => {
          let user = response.data

          user.loggedIn = true
          user.loggingIn = false
          user.password = ''

          this.set(user)

          this.serializeUser()

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

          this.routerChannel.request('route', '/home')
        },
        url: '/api/login'
      })
    })
  }

  logout () {
    localStorage.removeItem('user')

    cookie.cookie.removeSpecific('connect.sid', {
      path: '/'
    })

    this.set({
      email: '',
      loggedIn: false
    })
  }

  serializeUser () {
    let user = this.toJSON()

    localStorage.setItem('user', JSON.stringify({
      drilled: user.drilled,
      drilledDispatch: user.drilledDispatch,
      email: user.email,
      group: user.group,
      id: user.id,
      nicknames: user.nicknames
    }))
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
      name: '',
      password: ''
    }
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }
}
