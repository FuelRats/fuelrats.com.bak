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
          console.log(response)

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
