import BaseTableView from 'views/BaseTableView'
import LeaderboardRowView from 'views/LeaderboardRow'
import template from 'templates/Leaderboard.hbs'





export default class Leaderboard extends BaseTableView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get childView () {
    return LeaderboardRowView
  }
}
