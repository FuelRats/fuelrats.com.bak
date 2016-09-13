import _ from 'underscore'
import Backbone from 'backbone'

import Blog from 'models/Blog'





export default class Blogs extends Backbone.PageableCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('date')
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Blog
  }

  get state () {
    return this._state || (this._state = {
      currentPage: 1,
      firstPage: 1,
      pageSize: 10
    })
  }

  get url () {
    return '/wp-api/posts/'
  }

  set state (value) {
    this._state = value
  }
}
