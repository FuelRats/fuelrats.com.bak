import BaseTableView from 'views/BaseTableView'
import RescueRowView from 'views/RescueRow'
import template from 'templates/RescueTable.hbs'





export default class RescueTable extends BaseTableView {

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
    return RescueRowView
  }
}
