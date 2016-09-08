import BaseLayoutView from 'views/BaseLayoutView'
import CommentListView from 'views/CommentList'
import template from 'templates/Blog.hbs'





export default class Blog extends BaseLayoutView {

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

    this.getRegion('comments').show(new CommentListView({
      collection: this.model.get('comments')
    }), {
      replaceElement: true
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get regions () {
    return this._regions || (this._regions = {
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
