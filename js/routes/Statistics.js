import Route from '../Route'
import StatisticsModel from 'models/Statistics'
import StatisticsView from 'views/Statistics'





export default class Statistics extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.model = new StatisticsModel

      this.viewOptions.model.fetch({
        error: reject,
        success: resolve
      })
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Statistics'
  }

  get view () {
    return StatisticsView
  }
}
