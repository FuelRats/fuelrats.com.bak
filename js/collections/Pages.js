import _ from 'underscore'

import BaseCollection from 'collections/Base'





export default class Pages extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('date')
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get url () {
    return '//www.fuelrats.com/wp-json/wp/v2/pages'
  }
}
