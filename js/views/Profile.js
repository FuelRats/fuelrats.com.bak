import Backbone from 'backbone'
import BaseLayoutView from 'views/BaseLayoutView'
import PageableRescuesCollection from 'collections/PageableRescues'
import PaginationDataModel from 'models/PaginationData'
import RatListView from 'views/RatList'
import RescueTableView from 'views/RescueTable'
import template from 'templates/Profile.hbs'





export default class Profile extends BaseLayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _getRescues (rat) {
    let rescues = new PageableRescuesCollection
    rescues.setPageSize(10)
    rescues.setFilters({
      rats: [rat.get('id')]
    })
    rescues.getPage(1, {
      success: this._showRescues.bind(this)
    })
  }

  _showRescues (rescues) {
    this.getRegion('rescues').show(new RescueTableView({
      className: 'rescues',
      collection: rescues,
      model: new PaginationDataModel({
        collection: rescues
      }),
    }, {
      replaceElement: true
    }))
  }

  _updateRescues (event) {
    let rat = this.model.get('rats').findWhere({
      id: event.target.getAttribute('data-rat-id')
    })

    this._getRescues(rat)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      events: {
        'click [data-rat-id]': '_updateRescues'
      },
      template: template
    })

    super(options)
  }

  onAttach () {
    super.onAttach()

    this._getRescues(this.model.get('rats').first())
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get regions () {
    return this._regions || (this._regions = {
      rescues: '.rescues'
    })
  }

  get tagName () {
    return 'main'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
