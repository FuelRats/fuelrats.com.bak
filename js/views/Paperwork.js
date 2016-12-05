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
    this.ui.firstLimpet[0].addEventListener('search', _.debounce(this._getFirstLimpetAutocomplete.bind(this), 300))
    this.ui.system[0].addEventListener('search', _.debounce(this._getSystemAutocomplete.bind(this), 300))
  }

  _getFirstLimpetAutocomplete (event) {
    let query = (event.detail || '').trim().toLowerCase()

    if (query) {
      let collection = this.model.get('rats')
      .filter(model => {
        return model.get('CMDRname').toLowerCase().indexOf(query) !== -1
      })
      .map(model => {
        return {
          id: model.get('id'),
          value: model.get('CMDRname')
        }
      })

      event.target.updateOptions(collection)
    }
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

  _onGetBooleanRadio (value, options) {
    // Convert the boolean value into a string for radio button values
    if (value) {
      return 'yes'
    } else {
      return 'no'
    }
  }

  _onSetBooleanRadio (value, options) {
    // Convert the string value of the radio button into a boolean for
    // the model
    return value === 'yes'
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
    this.model.set('saving', true)

    this.listenToOnce(this.model, 'sync', () => {
      this.model.set('saving', false)
    })

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
      'input[name=codeRed]': {
        observe: 'codeRed',
        onGet: this._onGetBooleanRadio,
        onSet: this._onSetBooleanRadio
      },
      '#firstLimpet': {
        getVal: ($el, event, options) => {
          return $el.val().map(model => {
            return {
              id: model.id,
              CMDRname: model.value
            }
          })[0]
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
      'input[name=platform]': 'platform',
      '#rats': {
        getVal: ($el, event, options) => {
          this.model.get(options.observe).reset($el.val().map(model => {
            return {
              id: model.id,
              CMDRname: model.value
            }
          }))
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
      'input[name=successful]': {
        observe: 'successful',
        onGet: this._onGetBooleanRadio,
        onSet: this._onSetBooleanRadio
      },
      '#system': {
        getVal: ($el, event, options) => {
          return $el.val()[0]
        },
        initialize: ($el, model, options) => {
          let system = model.get('system')

          if (system) {
            $el[0].addTag(system)
          }
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
