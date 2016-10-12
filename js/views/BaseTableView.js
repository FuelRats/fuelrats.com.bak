import Backbone from 'backbone'





export default class BaseTable extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.$el.find('[data-sort]').on('click', this.changeSort.bind(this))
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  changeSort (event) {
    this.collection.setSorting(event.target.getAttribute('data-sort'), 1, {})
    console.log('changeSort', this.collection.state)
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
