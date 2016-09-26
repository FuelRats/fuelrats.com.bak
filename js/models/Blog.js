import Backbone from 'backbone'
import moment from 'moment'





import BaseModel from 'models/Base'
import AuthorModel from 'models/Author'
import CategoriesCollection from 'collections/Categories'
import CommentsCollection from 'collections/Comments'





export default class Blog extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  getAuthor (authorId) {
    let authors = this.appChannel.request('authors')
    let author = authors.findWhere({id: authorId})

    if (!author) {
      author = authors.add({id: authorId})
      author.fetch()
    }

    return author
  }

  getCategories (categoryIds) {
    let categories = new CategoriesCollection

    categoryIds.forEach((categoryId) => {
      categories.add(this.getCategory(categoryId))
    })

    return categories
  }

  getCategory (categoryId) {
    let categories = this.appChannel.request('categories')
    let category = categories.findWhere({id: categoryId})

    if (!category) {
      category = categories.add({id: categoryId})
      category.fetch()
    }

    return category
  }

  getComments () {
    let comments = this.get('comments')

    if (!comments.length) {
      comments.url = this.get('id')

      return new Promise((resolve, reject) => {
        comments.getFirstPage({
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

      response.author = this.getAuthor(response.author)
      response.categories = this.getCategories(response.categories)

      // Clean up unnecessary attributes
      delete response._links
      delete response.date_gmt
      delete response.link
      delete response.guid
      delete response.modified_gmt
      delete response.ping_status
      delete response.slug

      // Mark as parsed so it doesn't get parsed again
      response.parsed = true
    }

    return response
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      author: '',
      categories: [],
      comments: new CommentsCollection
    }
  }
}
