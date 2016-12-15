import cookie from 'cookies-js'

import BaseModel from './Base'
import RatModel from 'models/Rat'
import RatsCollection from 'collections/Rats'
import RescuesCollection from 'collections/Rescues'





export default class User extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.appChannel.request('rescues'), 'add change', (rescue) => {
      let rescueRats = rescue.get('rats')
      let rescues = this.get('rescues')
      let userRats = this.get('rats')

      if (userRats instanceof RatsCollection) {
        userRats.forEach(userRat => {
          if (rescueRats instanceof RatsCollection) {
            if (rescueRats.contains(userRat)) {
              rescues.add(rescue)
            }
          }
        })
      }
    })

    this.listenTo(this.get('rats'), 'add', this.getRescues)

    this.listenTo(this, 'change:CMDRs', this.getRats)
    this.listenTo(this, 'change:group change:groups', this.getPermissions)
    this.listenTo(this, 'change:loggedIn', this._updateAvatar)
  }

  _loginWithCredentials () {
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

          localStorage.setItem('userID', this.get('id'))

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

  _updateAvatar () {
    let id = this.get('id')

    this.set('avatar', `//api.adorable.io/avatars/${id}`)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  getPermissions () {
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

  getProfile () {
    return $.ajax({
      method: 'get',
      success: (response, status, xhr) => {
        let profile = response.data

        let stats = {
          assistCount: 0,
          failureCount: 0,
          firstLimpetCount: 0,
          successRate: 0,
          totalRescues: 0
        }

        this.set({
          group: profile.group,
          nicknames: profile.nicknames
        })

        profile.rats.forEach(rat => {
          let ratModel = this.get('rats').findWhere({
            id: rat.id
          })

          stats.assistCount += rat.assistCount
          stats.failureCount += rat.failureCount
          stats.firstLimpetCount += rat.firstLimpetCount
          stats.totalRescues += rat.totalRescues

          rat.successRate = rat.successRate !== 'NaN' ? parseFloat(rat.successRate) : 0

          ratModel.set({
            assistCount: rat.assistCount,
            failureCount: rat.failureCount,
            firstLimpetCount: rat.firstLimpetCount,
            successRate: rat.successRate,
            totalRescues: rat.totalRescues
          })
        })

        stats.successRate = ((stats.firstLimpetCount + stats.assistCount) / stats.totalRescues * 100).toFixed(2)

        this.set(stats)
      },
      url: '/api/profile'
    })
  }

  getRats () {
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

  getRescues () {
    let allRescues = this.appChannel.request('rescues')
    let id = this.get('id')
    let rescues = this.get('rescues')

    let filteredRescues = allRescues.filter(rescue => {
      let rats = rescue.get('rats')

      return !!rats.findWhere({
        id: id
      })
    })

    allRescues.add(filteredRescues)
  }

  getUserInfo () {
    let id = localStorage.getItem('userID')

    if (id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          error: reject,
          method: 'get',
          success: (response, status, xhr) => {
            let user = response.data

            user.loggedIn = true
            user.loggingIn = false

            this.set(this.parse(user))

            resolve()
          },
          url: `/api/users/${id}`
        })
      })
    } else {
      return Promise.resolve()
    }
  }

  initialize () {
    this._bindEvents()
  }

  login () {
    return new Promise((resolve, reject) => {
      let promise

      if (cookie.get('connect.sid') && localStorage.getItem('userID')) {
        promise = this.getUserInfo()

      } else {
        promise = this._loginWithCredentials()
      }

      promise
      .then(resolve)
      .catch(reject)
    })
  }

  logout () {
    cookie.expire('connect.sid')
    localStorage.removeItem('userID')

    this.set({
      email: '',
      loggedIn: false
    })
  }

  parse (response) {
    return response
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
      rats: new RatsCollection,
      rescues: new RescuesCollection
    }
  }
}
