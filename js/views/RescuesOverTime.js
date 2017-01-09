import BaseItemView from 'views/BaseItemView'
import template from 'templates/RescuesOverTime.hbs'





export default class RescuesOverTime extends BaseItemView {

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
