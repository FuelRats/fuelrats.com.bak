import CategoriesCollection from 'collections/Categories'
import AuthorModel from 'models/Author'
import AuthorView from 'views/Author'
import BaseLayoutView from 'views/BaseLayoutView'
import CategoryListView from 'views/CategoryList'

import template from 'templates/BlogSummary.hbs'





export default class BlogSummary extends BaseLayoutView {

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





  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  onAttach () {
    super.onAttach()

    this._showCategories()
    this.listenTo(this.model, 'change:categories', this._showCategories)
    this._showAuthor()
    this.listenTo(this.model, 'change:author', this._showAuthor)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get regions () {
    return this._regions || (this._regions = {
      author: '.author',
      categories: '.categories'
    })
  }

  get tagName () {
    return 'li'
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
