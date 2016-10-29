import Backbone from 'backbone'
import Bloodhound from 'typeahead.js'

let prototype = Object.create(HTMLElement.prototype)





/******************************************************************************\
  addTag
\******************************************************************************/

prototype.addTag = function addTag (value) {
  if (!this.allowDupes && this.value.indexOf(value) !== -1) {
    this.dispatchEvent(new CustomEvent('duplicate', {
      detail: value
    }))
    return
  }

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
  clearSelectedTag
\******************************************************************************/

prototype.clearSelectedTag = function clearSelectedTag () {
  let selectedTag = this.tagList.querySelector('.focus')

  if (selectedTag) {
    selectedTag.classList.remove('focus')
  }
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

  this.optionList.classList.add('options', 'hide')
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

  this.input.addEventListener('keydown', this.handleKeybinds.bind(this))
  this.input.addEventListener('input', this.handleInput.bind(this))
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

    ':host .options .focus {' +
      'background-color: lightgrey;' +
//      'color: white;' +
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

    ':host .tags .focus {' +
      'background-color: blue;' +
      'color: white;' +
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
  handleDelete
\******************************************************************************/

prototype.handleDelete = function handleDelete () {
  if (this.shouldCaptureKeybind()) {
    event.preventDefault()

    let selectedTag = this.tagList.querySelector('.focus')

    if (selectedTag) {
      let previousTag = selectedTag.previousElementSibling

      this.removeTag(selectedTag)
      previousTag.classList.add('focus')

    } else if (selectedTag = this.tagList.querySelector('li:last-of-type')) {
      selectedTag.classList.add('focus')
    }
  }
}





/******************************************************************************\
  handleDownArrow
\******************************************************************************/

prototype.handleDownArrow = function handleDownArrow () {
  event.preventDefault()

  let selectedOption = this.optionList.querySelector('.focus')

  if (selectedOption) {
    let nextOption = selectedOption.nextElementSibling

    if (nextOption) {
      selectedOption.classList.remove('focus')
      nextOption.classList.add('focus')
    }
  } else {
    selectedOption = this.optionList.querySelector('li:first-of-type')

    if (selectedOption) {
      selectedOption.classList.add('focus')
    }
  }
}





/******************************************************************************\
  handleInput
\******************************************************************************/

prototype.handleInput = function handleInput () {
  this.clearSelectedTag()

  this.search(this.input.value)
}





/******************************************************************************\
  handleLeftArrow
\******************************************************************************/

prototype.handleLeftArrow = function handleLeftArrow () {
  if (this.shouldCaptureKeybind()) {
    event.preventDefault()

    let selectedTag = this.tagList.querySelector('.focus')

    if (selectedTag) {
      let previousTag = selectedTag.previousElementSibling

      if (previousTag) {
        this.clearSelectedTag()
        previousTag.classList.add('focus')
      }
    } else {
      selectedTag = this.tagList.querySelector('li:last-of-type')

      if (selectedTag) {
        selectedTag.classList.add('focus')
      }
    }
  }
}





/******************************************************************************\
  handleKeybinds
\******************************************************************************/

prototype.handleKeybinds = function handleKeybinds (event) {
  switch (event.which) {
    case 9: // tab
    case 13: // enter
      this.handleReturn(event)
      break

    case 8: // backspace
    case 46: // delete
      this.handleDelete()
      break

    case 37: // left arrow
      this.handleLeftArrow()
      break

    case 39: // right arrow
      this.handleRightArrow()
      break

    case 38: // up arrow
      this.handleUpArrow()
      break

    case 40: // down arrow
      this.handleDownArrow()
      break
  }

//  console.log('handleKeybinds', event.which)
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
  handleReturn
\******************************************************************************/

prototype.handleReturn = function handleReturn (event) {
  let value = this.input.value
  let selectedOption = this.optionList.querySelector('.focus')

  if (selectedOption) {
    value = selectedOption.innerText
  }

  if (value) {
    event.preventDefault()

    this.addTag(value)

    this.clearInput()
    this.clearOptions()
  }
}





/******************************************************************************\
  handleRightArrow
\******************************************************************************/

prototype.handleRightArrow = function handleRightArrow () {
  if (this.shouldCaptureKeybind()) {
    event.preventDefault()

    let selectedTag = this.tagList.querySelector('.focus')

    if (selectedTag) {
      let nextTag = selectedTag.nextElementSibling

      if (nextTag) {
        nextTag.classList.add('focus')
      }

      this.clearSelectedTag()
    }
  }
}





/******************************************************************************\
  handleUpArrow
\******************************************************************************/

prototype.handleUpArrow = function handleUpArrow () {
  event.preventDefault()

  let selectedOption = this.optionList.querySelector('.focus')

  if (selectedOption) {
    let previousOption = selectedOption.previousElementSibling

    if (previousOption) {
      previousOption.classList.add('focus')
    }

    selectedOption.classList.remove('focus')
  } else {
    selectedOption = this.optionList.querySelector('li:first-of-type')

    if (selectedOption) {
      selectedOption.classList.add('focus')
    }
  }
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
  shouldCaptureKeybind
\******************************************************************************/

prototype.shouldCaptureKeybind = function shouldCaptureKeybind () {
  let input = this.input

  if (!input.selectionStart && !input.selectionEnd) {
    return true
  }

  return false
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
