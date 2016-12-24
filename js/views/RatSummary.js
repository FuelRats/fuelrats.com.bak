import BaseItemView from 'views/BaseItemView'
import template from 'templates/RatSummary.hbs'





export default class RatSummary extends BaseItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this.render)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onAttach () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get tagName () {
    return 'li'
  }

  get template () {
    return template
  }
}
