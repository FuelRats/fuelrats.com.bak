import BaseTableView from 'views/BaseTableView'
import UserAdminRowView from 'views/UserAdminRow'
import template from 'templates/UserAdminTable.hbs'





export default class UserAdminTable extends BaseTableView {

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
    return UserAdminRowView
  }

  get tagName () {
    return 'main'
  }
}
