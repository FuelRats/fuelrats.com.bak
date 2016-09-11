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

  addCategory (categoryId) {
    let categoriesCache = this.appChannel.request('categories')
    let categoriesCollection = this.get('categories')
    let category = categoriesCache.findWhere({id: categoryId})

    if (!category) {
      return new Promise((resolve, reject) => {
//        category = categoriesCollection.add(categoriesCache.add({id: categoryId}))

//        category.fetch({
//          error: reject,
//          success: resolve
//        })
        resolve()
      })
    }

    return Promise.resolve(categoriesCollection.add(category))
  }

  getAuthor (authorId) {
    let authors = this.appChannel.request('authors')
    let author = authors.findWhere({id: authorId})

    if (!author) {
      author = authors.add({id: authorId})
      author.fetch()
    }

    return author
  }

  getCategories () {
    // Cache the original array of categories
    let categories = this.get('categories')
    let promises = []

    // Return if we've already converted categories into a collection
    if (categories instanceof Backbone.Collection) {
      return Promise.resolve()
    }

    // Create a new collection for storing the categories
    this.set('categories', new CategoriesCollection)

    categories.forEach((categoryId) => {
      promises.push(this.addCategory(categoryId))
    })

    return new Promise((resolve, reject) => {
      Promise.all(promises)
      .then(resolve)
      .catch(reject)
    })
  }

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

      response.author = this.getAuthor(response.author)

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
      comments: new CommentsCollection
    }
  }
}
