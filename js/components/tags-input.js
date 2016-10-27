import Backbone from 'backbone'
import Bloodhound from 'typeahead.js'

let prototype = Object.create(HTMLElement.prototype)

prototype.addTag = function (value) {
  this.value.push(value)
  this.tagList.appendChild(this.createTag(value))
  this.dispatchEvent(new CustomEvent('add', {
    detail: value
  }))
}

prototype.attachedCallback = function () {}

prototype.attributeChangedCallback = function (attribute, oldValue, newValue) {
  switch (attribute) {
    case 'data-allow-duplicates':
      this.allowDupes = !!newValue
      break
  }
}

prototype.clearOptions = function () {
  this.optionList.innerHTML = ''
}

prototype.createdCallback = function () {
  this.initializeBloodhound()

  this.value = []
  this.optionList = document.createElement('ol')
  this.tagList = document.createElement('ul')
  this.input = document.createElement('input')

  this.input.addEventListener('input', this.handleInput.bind(this))
  this.input.addEventListener('keydown', this.handleReturn.bind(this))

  let startingValue = this.getAttribute('value')
  if (startingValue) {
    startingValue.split(',').forEach(this.addTag)
  }

  this.allowDupes = !!this.getAttribute('data-allow-duplicates')

  this.createShadowRoot()
  this.shadowRoot.appendChild(this.tagList)
  this.shadowRoot.appendChild(this.input)
  this.shadowRoot.appendChild(this.optionList)
}

prototype.createOption = function (option) {
  let optionElement = document.createElement('li')

  optionElement.innerHTML = option.CMDRname

  return optionElement
}

prototype.createRemoveButton = function (tag) {
  let removeButton = document.createElement('button')

  removeButton.addEventListener('click', this.removeTag.bind(this, tag))

  return removeButton
}

prototype.createTag = function (value) {
  let tag = document.createElement('li')

  tag.appendChild(this.createTextWrapper(value))
  tag.appendChild(this.createRemoveButton(tag))

  return tag
}

prototype.createTextWrapper = function (value) {
  let textWrapper = document.createElement('span')

  textWrapper.innerHTML = value

  return textWrapper
}

prototype.detachedCallback = function () {}

prototype.handleReturn = function (event) {
  let value = this.input.value
  if ((event.which === 9 || event.which === 13) && value) {
    event.preventDefault()

    if (!this.allowDupes && this.value.indexOf(value) !== -1) {
      this.dispatchEvent(new CustomEvent('duplicate', {
        detail: value
      }))
      return
    }

    this.addTag(value)

    this.input.value = ''
  }
}

prototype.handleInput = function () {
  this.search(this.input.value)
}

prototype.initializeBloodhound = function (target) {
  this.engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      prepare: function (query, settings) {
        settings.data = {
          limit: 10,
          name: query
        }

        return settings
      },
      transform: function (response) {
        return response.data
      },
      url: '/api/autocomplete'
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace
  })
}

prototype.removeTag = function (tag) {
  let value = tag.querySelector('span').innerText
  let indexToRemove = this.value.indexOf(value)

  this.value.splice(indexToRemove, indexToRemove)

  tag.querySelector('button').removeEventListener('click', this.removeTag)
  tag.remove()

  this.dispatchEvent(new CustomEvent('remove', {
    detail: value
  }))
}

prototype.search = function (query) {
  this.clearOptions()

  if (query) {
    this.engine.search(query, data => {
      this.updateOptions(data)
    }, data => {
      this.updateOptions(data)
    })
  }
}

prototype.updateOptions = function (options) {
  options.forEach(option => {
    this.optionList.appendChild(this.createOption(option))
  })
}

document.registerElement('tags-input', {
  prototype: prototype
})
