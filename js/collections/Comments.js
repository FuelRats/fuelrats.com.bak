import WordpressCollection from 'collections/Wordpress'
import Comment from 'models/Comment'





let url = '/wp-api/comments/?post='





export default class Comments extends WordpressCollection {

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
