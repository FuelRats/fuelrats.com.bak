import Backbone from 'backbone'
import BaseLayoutView from 'views/BaseLayoutView'
import LeaderboardView from 'views/Leaderboard'
import RescuesBySystemView from 'views/RescuesBySystem'
import RescuesOverTimeView from 'views/RescuesOverTime'
import StatisticsOverviewView from 'views/StatisticsOverview'
import template from 'templates/Statistics.hbs'





export default class Statistics extends BaseLayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  _showLeaderboard (rescues) {
    this._showView(LeaderboardView, 'leaderboard', {
      collection: this.model.get('leaderboard')
    })

    this._showView(StatisticsOverviewView, 'overview', {
      collection: this.model.get('overview')
    })

    this._showView(RescuesBySystemView, 'system', {
      collection: this.model.get('system')
    })

    this._showView(RescuesOverTimeView, 'timeline', {
      collection: this.model.get('timeline')
    })
  }

  _showView (view, region, options) {
    this.getRegion(region).show(new view(options, {
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
      overview: '.overview',
      system: '.system',
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
