import moment from 'moment'
import Backbone from 'backbone'
import BaseCollection from 'collections/Base'
import LeaderboardModel from 'models/Leaderboard'





export default class Leaderboard extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return model.get('rescues')
  }

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  get model () {
    return LeaderboardModel
  }
}
