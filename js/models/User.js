import cookie from 'cookies-js'

import BaseModel from './Base'
import RatModel from 'models/Rat'
import RatsCollection from 'collections/Rats'





export default class User extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'change:CMDRs', this._getRats)
    this.listenTo(this, 'change:group change:groups', this._getPermissions)
    this.listenTo(this, 'change:loggedIn', this._updateAvatar)

    this.listenTo(this, 'change', () => {
      if (this.get('loggedIn')) {
        this.serializeUser()
      } else {
        this.deserializeUser()
      }
    })
  }

  _getRats () {
    let allRats = this.appChannel.request('rats')
    let CMDRs = this.get('CMDRs')
    let rats = this.get('rats')

    CMDRs.forEach(id => {
      let rat
      let idHash = {
        id: id
      }

      // Skip this rat if it's already in our local collection
      if (rats.findWhere(idHash)) {
        return
      }

      // Look for the rat in the global rat cache
      if (!rat) {
        rat = allRats.findWhere(idHash)
      }

      // Add the rat to the global cache if it's not there already
      if (!rat) {
        rat = allRats.add(idHash)
        rat.fetch()
      }

      // Add the rat to the local cache
      rats.add(rat)
    })
  }

  _getPermissions () {
    let group = this.get('group') || this.get('groups')
    let isArray = Array.isArray(group)

    let isAdmin = false
    let isModerator = false
    let isOverseer = false

    if (isArray) {
      isAdmin = group.indexOf('admin') !== -1
      isModerator = group.indexOf('moderator') !== -1
      isOverseer = group.indexOf('overseer') !== -1
    } else {
      isAdmin = group === 'admin'
      isModerator = isAdmin || group === 'moderator'
      isOverseer = isModerator || group === 'overseer'
    }

    this.set('isAdmin', isAdmin)
    this.set('isModerator', isModerator)
    this.set('isOverseer', isOverseer)
  }

  _updateAvatar () {
    let id = this.get('id')

    this.set('avatar', `//api.adorable.io/avatars/${id}`)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  deserializeUser () {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      user.loggedIn = true
      this.set(this.parse(user))
      this._getPermissions()
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

          this.set(this.parse(user))

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

  parse (response) {
    return response
  }

  serializeUser () {
    if (this.get('loggedIn')) {
      let user = this.toJSON()

      localStorage.setItem('user', JSON.stringify({
        CMDRs: user.CMDRs,
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
      avatar: '',
      CMDRs: [],
      dispatchDrilled: false,
      drilled: false,
      email: '',
      loggedIn: false,
      loggingIn: false,
      name: '',
      password: '',
      rats: new RatsCollection
    }
  }
}
