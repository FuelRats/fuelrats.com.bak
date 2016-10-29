import Backbone from 'backbone'
import Bloodhound from 'typeahead.js'

let prototype = Object.create(HTMLElement.prototype)





/******************************************************************************\
  addTag
\******************************************************************************/

prototype.addTag = function addTag (value) {
  this.value.push(value)
  this.tagList.appendChild(this.createTag(value))
  this.dispatchEvent(new CustomEvent('add', {
    detail: value
  }))
}





/******************************************************************************\
  attachedCallback
\******************************************************************************/

prototype.attachedCallback = function attachedCallback () {}





/******************************************************************************\
  attributeChangedCallback
\******************************************************************************/

prototype.attributeChangedCallback = function attributeChangedCallback (attribute, oldValue, newValue) {
  switch (attribute) {
    case 'data-allow-duplicates':
      this.allowDupes = !!newValue
      break
  }
}





/******************************************************************************\
  clearInput
\******************************************************************************/

prototype.clearInput = function clearInput () {
  this.input.value = ''
}





/******************************************************************************\
  clearOptions
\******************************************************************************/

prototype.clearOptions = function clearOptions () {
  this.optionList.innerHTML = ''
}





/******************************************************************************\
  createdCallback
\******************************************************************************/

prototype.createdCallback = function createdCallback () {
  this.initializeBloodhound()

  this.value = []
  this.optionList = document.createElement('ol')
  this.tagList = document.createElement('ul')
  this.allowDupes = !!this.getAttribute('data-allow-duplicates')

  let startingValue = this.getAttribute('value')
  if (startingValue) {
    startingValue.split(',').forEach(this.addTag)
  }

  this.optionList.classList.add('options')
  this.tagList.classList.add('tags')

  this.createShadowRoot()
  this.shadowRoot.appendChild(this.createStylesheet())
  this.shadowRoot.appendChild(this.tagList)
  this.shadowRoot.appendChild(this.createInput())
  this.shadowRoot.appendChild(this.optionList)
}





/******************************************************************************\
  createInput
\******************************************************************************/

prototype.createInput = function createInput () {
  this.input = document.createElement('input')

  this.input.addEventListener('input', this.handleInput.bind(this))
  this.input.addEventListener('keydown', this.handleReturn.bind(this))
  this.input.addEventListener('focus', () => {
    this.optionList.classList.remove('hide')
  })
  this.input.addEventListener('blur', () => {
    this.optionList.classList.add('hide')
  })

  return this.input
}





/******************************************************************************\
  createOption
\******************************************************************************/

prototype.createOption = function createOption (option) {
  let optionElement = document.createElement('li')

  optionElement.innerHTML = option.CMDRname

  return optionElement
}





/******************************************************************************\
  createRemoveButton
\******************************************************************************/

prototype.createRemoveButton = function createRemoveButton (tag) {
  let removeButton = document.createElement('button')

  removeButton.addEventListener('click', this.removeTag.bind(this, tag))

  return removeButton
}





/******************************************************************************\
  createStylesheet
\******************************************************************************/

prototype.createStylesheet = function createStylesheet () {
  let stylesheet = document.createElement('style')

  stylesheet.innerHTML =
    ':host {' +
      'align-content: stretch;' +
      'align-items: center;' +
      'background-color: white;' +
      'border: 1px solid black;' +
      'display: flex;' +
      'flex-wrap: wrap;' +
      'position: relative;' +
    '}' +

//    ':host * {' +
//      'box-sizing: border-box;'
//    '}' +

    ':host input {' +
      'border: none;' +
      'flex-grow: 1;' +
      'flex-shrink: 0;' +
      'min-width: 20%;' +
      'padding: 1rem 1.5rem;' +
    '}' +

    ':host .options,' +
    ':host .tags {' +
      'list-style: none;' +
      'margin: 0;' +
      'padding: 0;' +
    '}' +

    ':host .options {' +
      'background-color: white;' +
      'border: 1px solid black;' +
      'left: 0;' +
      'position: absolute;' +
      'right: 0;' +
      'top: 100%;' +
      'width: 100%;' +
    '}' +

    ':host .options:empty {' +
      'display: none;' +
    '}' +

    ':host .tags {' +
      'align-items: center;' +
      'display: flex;' +
      'flex-wrap: wrap;' +
      'flex-shrink: 0;' +
      'max-width: 100%;' +
    '}' +

    ':host .tags li {' +
      'background-color: lightgrey;' +
      'margin: 0.5rem;' +
      'padding: 0 0.5rem;' +
    '}' +

    ':host .hide {' +
      'display: none;' +
    '}'

  return stylesheet
}





/******************************************************************************\
  createTag
\******************************************************************************/

prototype.createTag = function createTag (value) {
  let tag = document.createElement('li')

  tag.appendChild(this.createTextWrapper(value))
  tag.appendChild(this.createRemoveButton(tag))

  return tag
}





/******************************************************************************\
  createTextWrapper
\******************************************************************************/

prototype.createTextWrapper = function createTextWrapper (value) {
  let textWrapper = document.createElement('span')

  textWrapper.innerHTML = value

  return textWrapper
}





/******************************************************************************\
  detachedCallback
\******************************************************************************/

prototype.detachedCallback = function detachedCallback () {}





/******************************************************************************\
  handleReturn
\******************************************************************************/

prototype.handleReturn = function handleReturn (event) {
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

    this.clearInput()
    this.clearOptions()
  }
}





/******************************************************************************\
  handleInput
\******************************************************************************/

prototype.handleInput = function handleInput () {
  this.search(this.input.value)
}





/******************************************************************************\
  handleOptionClick
\******************************************************************************/

prototype.handleOptionClick = function handleOptionClick (event) {
  let target = event.target
  let value = target.innerText

  this.addTag(value)
  this.clearInput()
  this.clearOptions()
}





/******************************************************************************\
  initializeBloodhound
\******************************************************************************/

prototype.initializeBloodhound = function initializeBloodhound (target) {
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





/******************************************************************************\
  removeTag
\******************************************************************************/

prototype.removeTag = function removeTag (tag) {
  let value = tag.querySelector('span').innerText
  let indexToRemove = this.value.indexOf(value)

  this.value.splice(indexToRemove, indexToRemove)

  tag.querySelector('button').removeEventListener('click', this.removeTag)
  tag.remove()

  this.dispatchEvent(new CustomEvent('remove', {
    detail: value
  }))
}





/******************************************************************************\
  search
\******************************************************************************/

prototype.search = function search (query) {
  this.clearOptions()

  if (query) {
    this.engine.search(query, data => {
      this.updateOptions(data)
    }, data => {
      this.updateOptions(data)
    })
  }
}





/******************************************************************************\
  updateOptions
\******************************************************************************/

prototype.updateOptions = function updateOptions (options) {
  options.forEach(option => {
    let optionElement = this.createOption(option)

    optionElement.addEventListener('click', this.handleOptionClick.bind(this))

    this.optionList.appendChild(optionElement)
  })
}





document.registerElement('tags-input', {
  prototype: prototype
})
