import Backbone from 'backbone'

import template from 'templates/UnorderedList.hbs'





export default class UnorderedList extends Backbone.Marionette.CompositeView {

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
    Public Methods
  \******************************************************************************/

  get tagName () {
    return 'ul'
  }
}
