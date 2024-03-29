import _ from 'underscore'
import Backbone from 'backbone'





export default class Base extends Backbone.Model {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _decrappify (string) {
    // Remove inline styles
    string = string.replace(/(align=".*")?/gi, '')
    string = string.replace(/(style=".*")?/gi, '')

    // Language attributes shouldn't be set on elements
    string = string.replace(/(lang=".*")?/gi, '')

    return string
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (model, options) {
    super(model, options)

    this.sync = new Backbone.Hoard.Control().getModelSync()
  }

  toJSON (options) {
    let clone = super.toJSON(options)

    delete clone.loaded
    delete clone.loading

    return clone
  }

  toViewJSON (options) {
    return super.toJSON(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }
}
