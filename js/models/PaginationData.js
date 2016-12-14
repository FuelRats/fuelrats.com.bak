import Backbone from 'backbone'





export default class PageableData extends Backbone.Model {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    console.log(this.get('collection'))
    this.listenTo(this.get('collection'), 'pageable:state:change sync', this._update.bind(this))
  }

  _update () {
    let collection = this.get('collection')
    let currentPage = collection.state.currentPage
    let lastPage = collection.state.lastPage
    let firstPage = collection.state.firstPage

    this.set({
      currentPage: currentPage,
      hasMultiplePages: collection.hasNextPage() || collection.hasPreviousPage(),
      lastPage: lastPage,
      nextPage: collection.hasNextPage() ? currentPage + 1 : false,
      previousPage: collection.hasPreviousPage() ? currentPage - 1 : false
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._update()

    this._bindEvents()
  }
}
