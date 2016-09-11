import AuthorModel from 'models/Author'
import AuthorView from 'views/Author'
import BaseLayoutView from 'views/BaseLayoutView'
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

  _showComments () {
    this.getRegion('comments').show(new CommentListView({
      collection: this.model.get('comments')
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

    this._showComments()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get regions () {
    return this._regions || (this._regions = {
      author: '.author',
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
