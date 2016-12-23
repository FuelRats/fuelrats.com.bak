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

  _addNickname (event) {
    event.preventDefault()

    let nicknameInput = document.querySelector('input[name="add-nickname"]')

    this.listenToOnce(this.model, 'sync', () => {
      nicknameInput.value = ''
    })

    this.model.addNickname(nicknameInput.value)
    this.model.save()
  }

  _bindEvents () {
    this.listenTo(this.model, 'change', this.render)
  }

  _getRescues () {
    let rats = this.model.get('rats').map((rat) => {
      return rat.get('id')
    })
    let rescues = new PageableRescuesCollection

    rescues.setPageSize(10)
    rescues.setFilters({
      rats: rats
    })
    rescues.getPage(1, {
      success: this._showRescues.bind(this)
    })
  }

  _removeNickname (event) {
    this.model.removeNickname(event.currentTarget.getAttribute('data-nickname'))
    this.model.save()
  }

  _showRescues (rescues) {
    this.getRegion('rescues').show(new RescueTableView({
      className: 'rescues',
      collection: rescues,
      model: new PaginationDataModel({
        collection: rescues
      })
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
        'click [data-rat-id]': '_updateRescues',
        'click [data-action="add-nickname"]': '_addNickname',
        'click [data-action="remove-nickname"]': '_removeNickname'
      },
      template: template
    })

    super(options)
  }

  onAttach () {
    super.onAttach()

    this._getRescues()
    this._bindEvents()
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
