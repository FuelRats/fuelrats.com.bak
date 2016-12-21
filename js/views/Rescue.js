import _ from 'underscore'
import BaseItemView from 'views/BaseItemView'
import template from 'templates/Rescue.hbs'





export default class Rescue extends BaseItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {}





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  initialize () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get tagName () {
    return 'main'
  }
}
