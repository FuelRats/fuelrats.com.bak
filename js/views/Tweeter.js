import Backbone from 'backbone'

import TweetView from 'views/Tweet'
import template from 'templates/Tweeter.hbs'





export default class Tweeter extends Backbone.Marionette.CollectionView {

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

  get childView () {
    return TweetView
  }

  get className () {
    return 'tweets'
  }

  get tagName () {
    return 'ol'
  }
}
