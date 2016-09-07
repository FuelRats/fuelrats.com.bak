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
          console.log(response)

          this.set({
            loggedIn: true,
            loggingIn: false,
            password: ''
          })
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
