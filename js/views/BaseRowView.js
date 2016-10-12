import BaseLayoutView from 'views/BaseLayoutView'





export default class BaseRow extends BaseLayoutView {

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

  get regions () {
    return this._regions || (this._regions = {
      tbody: 'tbody'
    })
  }

  get tagName () {
    return 'tr'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
