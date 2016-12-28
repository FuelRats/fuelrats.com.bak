import BaseItemView from 'views/BaseItemView'
import template from 'templates/LeaderboardRow.hbs'





export default class LeaderboardRow extends BaseItemView {

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

  get tagName () {
    return 'tr'
  }
}
