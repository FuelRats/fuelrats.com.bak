import Backbone from 'backbone'
import BaseLayoutView from 'views/BaseLayoutView'
import LeaderboardView from 'views/Leaderboard'
import RescuesOverTimeView from 'views/RescuesOverTime'
import template from 'templates/Statistics.hbs'





export default class Statistics extends BaseLayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  _showLeaderboard (rescues) {
    this.getRegion('leaderboard').show(new LeaderboardView({
      collection: this.model.get('leaderboard')
    }, {
      replaceElement: true
    }))

    this.getRegion('timeline').show(new RescuesOverTimeView({
      collection: this.model.get('timeline')
    }, {
      replaceElement: true
    }))
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  onAttach () {
    super.onAttach()

    this._showLeaderboard()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get regions () {
    return this._regions || (this._regions = {
      leaderboard: '.leaderboard',
      timeline: '.timeline'
    })
  }

  get tagName () {
    return 'main'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
