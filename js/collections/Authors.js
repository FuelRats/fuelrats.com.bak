import _ from 'underscore'

import BaseCollection from 'collections/Base'
import Author from 'models/Author'





export default class Authors extends BaseCollection {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Author
  }

  get url () {
    return '/wp-api/users/'
  }
}
