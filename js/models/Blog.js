import moment from 'moment'





import BaseModel from 'models/Base'
import CommentsCollection from 'collections/Comments'





export default class Blog extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _decrappify (string) {
    // Remove inline styles
    string = string.replace(/(align=".*")?/gi, '')
    string = string.replace(/(style=".*")?/gi, '')

    // Language attributes shouldn't be set on elements
    string = string.replace(/(lang=".*")?/gi, '')

    return string
  }

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  getComments () {
    let comments = this.get('comments')

    if (!comments.length) {
      comments.url = this.get('id')

      return new Promise((resolve, reject) => {
        comments.fetch({
          error: reject,
          success: resolve
        })
      })

    } else {
      return Promise.resolve()
    }
  }

  parse (response) {
    if (!response.parsed) {
      // Convert dates to moment objects
      response.date = moment(response.date_gmt)
      response.modified = moment(response.modified_gmt)

      // Remove Wordpress crap that could mess us up
      response.content = this._decrappify(response.content.rendered)
      response.excerpt = this._decrappify(response.excerpt.rendered)
      response.title = this._decrappify(response.title.rendered)

      // Clean up unnecessary attributes
      delete response._links
      delete response.date_gmt
      delete response.link
      delete response.guid
      delete response.modified_gmt
      delete response.ping_status
      delete response.slug

      // Mark the blog as parsed so it doesn't get parsed again
      response.parsed = true
    }

    return response
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
