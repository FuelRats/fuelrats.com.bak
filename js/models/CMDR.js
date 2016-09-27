import BaseModel from './Base'





export default class CMDR extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this, 'change', () => {
      if (!this.get('loaded')) {
        this.set({
          loaded: true
        }, {
          silent: true
        })
      }
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      loaded: false
    }
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }
}
