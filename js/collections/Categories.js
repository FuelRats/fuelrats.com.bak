import _ from 'underscore'

import BaseCollection from 'collections/Base'
import Category from 'models/Category'





export default class Categories extends BaseCollection {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Category
  }

  get url () {
    return '/wp-api/categories/'
  }
}
