import BaseItemView from 'views/BaseItemView'
import template from 'templates/RescuesBySystem.hbs'





export default class RescuesBySystem extends BaseItemView {

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
