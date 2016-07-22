import _ from 'underscore'

import BaseCollection from 'collections/Base'
import Blog from 'models/Blog'





export default class Blogs extends BaseCollection {

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

  get url () {
    return '//www.fuelrats.com/wp-json/wp/v2/posts'
  }
}
