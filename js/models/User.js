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
        email: this.get('email'),
        error: reject,
        method: 'post',
        password: this.get('password'),
        success: (response, status, xhr) => {
          this.set({
            loggedIn: true,
            loggingIn: false,
            password: ''
          })
        },
        url: 'https://dev.api.fuelrats.com/login'
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
