import BaseTableView from 'views/BaseTableView'
import RatAdminRowView from 'views/RatAdminRow'
import template from 'templates/RatAdminTable.hbs'





export default class RatAdminTable extends BaseTableView {

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
    return RatAdminRowView
  }

  get childViewContainer () {
    return '.rats tbody'
  }

  get tagName () {
    return 'main'
  }
}
