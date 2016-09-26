import CategoriesCollection from 'collections/Categories'
import AuthorModel from 'models/Author'
import AuthorView from 'views/Author'
import BaseLayoutView from 'views/BaseLayoutView'
import CategoryListView from 'views/CategoryList'
import CommentListView from 'views/CommentList'

import template from 'templates/Blog.hbs'





export default class Blog extends BaseLayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _showAuthor () {
    let author = this.model.get('author')

    if (author instanceof AuthorModel) {
      this.getRegion('author').show(new AuthorView({
        model: author
      }), {
        replaceElement: true
      })
    }
  }

  _showCategories () {
    let categories = this.model.get('categories')

    if (categories instanceof CategoriesCollection) {
      this.getRegion('categories').show(new CategoryListView({
        collection: categories
      }), {
        replaceElement: true
      })
    }
  }

  _showComments () {
    let commentsCollection = this.model.get('comments')

    this.getRegion('comments').show(new CommentListView({
      collection: commentsCollection,
      model: commentsCollection.data
    }), {
      replaceElement: true
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  onAttach () {
    super.onAttach()

    this._showAuthor()
    this.listenTo(this.model, 'change:author', this._showAuthor)
    this._showCategories()
    this.listenTo(this.model, 'change:categories', this._showCategories)
    this._showComments()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get regions () {
    return this._regions || (this._regions = {
      author: '.author',
      categories: '.category-list',
      comments: '.comments'
    })
  }

  get tagName () {
    return 'article'
  }

  get template () {
    return template
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
