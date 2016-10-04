import cookie from 'cookies-js'

import BaseModel from './Base'
import RatsCollection from 'collections/Rats'





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
    let group = this.get('group') || this.get('groups')

    if ((Array.isArray(group) && group.indexOf('admin') !== -1) || group === 'admin') {
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
    if (cookie.get('connect.sid')) {
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

          resolve()
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
    localStorage.removeItem('user')
    cookie.expire('connect.sid')
  }

  serializeUser () {
    if (this.get('loggedIn')) {
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
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      rats: [],
      email: '',
      loggedIn: false,
      loggingIn: false,
      name: '',
      password: ''
    }
  }
}
