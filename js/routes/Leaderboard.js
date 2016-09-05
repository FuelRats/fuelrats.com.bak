import Route from '../Route'
import LeaderboardView from 'views/Leaderboard'





export default class Leaderboard extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
//      this.viewOptions.collection = this.appChannel.request('rescues')
//
//      this.viewOptions.collection.fetch({
//        error: reject,
//        success: resolve
//      })

      $.ajax({
//        data: {
//          sort: 50000
//        },
        error: reject,
        success: (response) => {
          console.log(response.data)
          resolve(response.data)
        },
        url: '//api.fuelrats.com/rats'
      })
//      this.viewOptions.model =
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Leaderboard'
  }

  get view () {
    return LeaderboardView
  }
}
