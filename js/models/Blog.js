import BaseModel from 'models/Base'
import CommentsCollection from 'collections/Comments'





export default class Blog extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  getComments () {
    let comments = this.get('comments')

    comments.url = this.get('id')

    return new Promise((resolve, reject) => {
      comments.fetch({
        error: reject,
        success: resolve
      })
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      comments: new CommentsCollection
    }
  }
}
