import Backbone from 'backbone'
import LeaderboardCollection from 'collections/Leaderboard'





export default class Statistics extends Backbone.Model {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    let data = response.data
    let timeline = data[0]
    let systems = data[1]
    let overview = data[2]
    let leaderboard = data[3]

    this.get('leaderboard').reset(leaderboard, {
      parse: true
    })
    this.get('overview').reset(overview)
    this.get('systems').reset(systems)
    this.get('timeline').reset(timeline)

    return {}
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      leaderboard: new LeaderboardCollection,
      overview: new Backbone.Collection,
      systems: new Backbone.Collection,
      timeline: new Backbone.Collection
    }
  }

  get urlRoot () {
    return '/api/statistics'
  }
}
