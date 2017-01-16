import BaseItemView from 'views/BaseItemView'
import template from 'templates/StatisticsOverview.hbs'





export default class StatisticsOverview extends BaseItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }
}
