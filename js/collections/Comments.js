import _ from 'underscore'

import BaseCollection from 'collections/Base'





let url = '/wp-api/comments/?post='





export default class Comments extends BaseCollection {

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
    return this._url || (this._url = url)
  }

  set url (id) {
    this._url = url + id
  }
}
