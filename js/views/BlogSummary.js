import AuthorModel from 'models/Author'
import AuthorView from 'views/Author'
import BaseLayoutView from 'views/BaseLayoutView'

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





  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  onAttach () {
    super.onAttach()

    this._showAuthor()

    this.listenTo(this.model, 'change:author', this._showAuthor)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get regions () {
    return this._regions || (this._regions = {
      author: '.author'
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
