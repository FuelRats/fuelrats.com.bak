import _ from 'underscore'
import Backbone from 'backbone'
import template from 'templates/Paperwork.hbs'





export default class Paperwork extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this._toggleSubmitButton)

    this.ui.rats[0].addEventListener('search', _.debounce(this._getRatAutocomplete.bind(this), 300))
    this.ui.firstLimpet[0].addEventListener('search', _.debounce(this._getRatAutocomplete.bind(this), 300))
  }

  _getRatAutocomplete (event) {
    let query = (event.detail || '').trim()

    if (query) {
      $.ajax({
        data: {
          limit: 10,
          name: query
        },
        success: (response) => {
          event.target.updateOptions(response.data.map((model) => {
            return {
              id: model.id,
              value: model.CMDRname
            }
          }))
        },
        url: '/api/autocomplete'
      })
    }
  }

  _toggleSubmitButton () {
    let submitButton = this.el.querySelector('button[type=submit]')

    if (this.isComplete()) {
      submitButton.removeAttribute('disabled')
    } else {
      submitButton.setAttribute('disabled', '')
    }
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

  isComplete () {
    return true
  }

  onAttach () {
    this._bindEvents()
  }

  onRender () {
    this.stickit()
  }

  onSubmit (event) {
    console.log('Submitted!', this.model.toJSON())

//    this.model.save()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get bindings () {
    return {
      '#codeRed': 'codeRed',
      '#firstLimpet': {
        getVal: ($el, event, options) => {
          return $el.val()[0]
        },
        observe: 'firstLimpet',
        updateModel: true
      },
      '#notes': 'notes',
      '#platform': 'platform',
      '#rats': {
        getVal: ($el, event, options) => {
          this.model.get(options.observe).reset($el.val())
        },
        observe: 'rats',
        updateModel: false
      },
      '#successful': 'successful',
      '#system': 'system'
    }
  }

  get events () {
    return this._events || (this._events = {
      'click button[type=submit]': 'onSubmit'
    })
  }

  get tagName () {
    return 'form'
  }

  get ui () {
    return this._ui || (this._ui = {
      rats: '#rats',
      firstLimpet: '#firstLimpet'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }

  set ui (value) {
    this._ui = value
  }
}
