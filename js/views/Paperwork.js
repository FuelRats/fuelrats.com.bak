import _ from 'underscore'
import Backbone from 'backbone'
import template from 'templates/Paperwork.hbs'





export default class Paperwork extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this._toggleSubmitButton)
  }

  _bindUIEvents () {
    this.ui.rats[0].addEventListener('search', _.debounce(this._getRatAutocomplete.bind(this), 300))
    this.ui.firstLimpet[0].addEventListener('search', _.debounce(this._getRatAutocomplete.bind(this), 300))
    this.ui.system[0].addEventListener('search', _.debounce(this._getSystemAutocomplete.bind(this), 300))
  }

  _getRatAutocomplete (event) {
    let query = (event.detail || '').trim()

    if (query) {
      $.ajax({
        data: {
          limit: 10,
          name: query
        },
        success: response => {
          event.target.updateOptions(response.data.map(model => {
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

  _getSystemAutocomplete (event) {
    let query = (event.detail || '').trim()

    if (query) {
      $.ajax({
        success: response => {
          let newOptions

          if (response) {
            newOptions = response.map(model => model.value)
          } else {
            newOptions = []
          }

          event.target.updateOptions(newOptions)
        },
        url: '/edsm-api/typeahead/systems/query/' + query
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

  initialize () {
    this._bindEvents()
  }

  isComplete () {
    return true
  }

  onAttach () {
    this._bindUIEvents()
  }

  onRender () {
    this.stickit()
  }

  onSubmit (event) {
    this.model.save()
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
        initialize: ($el, model, options) => {
          let firstLimpet = model.get('firstLimpet')

          if (firstLimpet) {
            $el[0].addTag({
              id: firstLimpet.get('id'),
              value: firstLimpet.get('CMDRname')
            })
          }
        },
        observe: 'firstLimpet'
      },
      '#notes': 'notes',
      '#platform': 'platform',
      '#rats': {
        getVal: ($el, event, options) => {
          this.model.get(options.observe).reset($el.val())
        },
        initialize: ($el, model, options) => {
          let rats = model.get('rats').toJSON()

          if (rats.length) {
            rats.forEach(rat => {
              $el[0].addTag({
                id: rat.id,
                value: rat.CMDRname
              })
            })
          }
        },
        observe: 'rats',
        updateModel: false
      },
      '#successful': 'successful',
      '#system': {
        getVal: ($el, event, options) => {
          return $el.val()[0]
        },
        observe: 'system'
      },
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
      firstLimpet: '#firstLimpet',
      rats: '#rats',
      system: '#system'
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
