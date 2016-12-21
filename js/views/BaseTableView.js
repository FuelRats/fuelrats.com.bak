import _ from 'underscore'
import Backbone from 'backbone'





export default class BaseTable extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.$el.find('[data-sort]').on('click', this.changeSort.bind(this))
  }

  _nextPage (event) {
    event.preventDefault()
    this.collection.getNextPage()
  }

  _previousPage (event) {
    event.preventDefault()
    this.collection.getPreviousPage()
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  changeSort (event) {
    this.collection.setSorting(event.target.getAttribute('data-sort'), 1, {})
    console.log('changeSort', this.collection.state)
  }

  constructor (options) {
    options = _.extend(options || {}, {
      events: {
        'click .next': '_nextPage',
        'click .previous': '_previousPage'
      }
    })

    super(options)
  }

  onAttach () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get childViewContainer () {
    return 'tbody'
  }
}
