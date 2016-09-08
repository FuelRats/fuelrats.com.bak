import _ from 'underscore'

import BaseCollection from 'collections/Base'
import Comment from 'models/Comment'





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

  get model () {
    return Comment
  }

  get url () {
    return this._url || (this._url = url)
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set url (id) {
    this._url = url + id
  }
}
