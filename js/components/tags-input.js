import Bloodhound from 'typeahead.js'

let prototype = Object.create(HTMLElement.prototype)





/******************************************************************************\
  addTag
\******************************************************************************/

prototype.addTag = function addTag (value) {
  if (this.checkDuplicate(value)) {
    return false
  }

  this.value.push(value)
  this.tagList.appendChild(this.createTag(value))
  this.dispatchEvent(new CustomEvent('add', {
    detail: value
  }))
  return true
}





/******************************************************************************\
  attachedCallback
\******************************************************************************/

prototype.attachedCallback = function attachedCallback () {}





/******************************************************************************\
  attributeChangedCallback
\******************************************************************************/

prototype.attributeChangedCallback = function attributeChangedCallback (attribute, oldValue, newValue) {
  let prop = null

  switch (attribute) {
    case 'data-duplicates':
      prop = 'allowDuplicates'
      break
    case 'data-multiple':
      prop = 'allowMultiple'
      break
    case 'data-new':
      prop = 'allowNew'
      break
    case 'data-debug':
      prop = 'debug'
      break
  }

  if (prop) {
    this.updateAttribute(attribute, prop)
  }
}





/******************************************************************************\
  checkDuplicate
\******************************************************************************/

prototype.checkDuplicate = function checkDuplicate (value) {
  if (!this.allowDuplicates && this.isDuplicate(value)) {
    this.handleDuplicate()
    return true
  }

  return false
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

  this.updateAttribute('data-duplicates', 'allowDuplicates')
  this.updateAttribute('data-multiple', 'allowMultiple')
  this.updateAttribute('data-new', 'allowNew')
  this.updateAttribute('data-debug', 'debug')
  this.identifier = this.getAttribute('id') || this.getAttribute('name')

  this.log('group', 'tags-input', this.identifier)
  this.log('Allow Duplicates:', this.allowDuplicates)
  this.log('Allow Multiple:', this.allowMultiple)
  this.log('Allow New:', this.allowNew)
  this.log('Debug:', this.debug)
  this.log('groupEnd')

  this.value = []

  this.optionList = document.createElement('ol')
  this.tagList = document.createElement('ul')

  let startingValue = this.getAttribute('value')
  if (startingValue) {
    startingValue.split(',').forEach(this.addTag)
  }

  this.optionList.classList.add('options')
  this.tagList.classList.add('tags')

  this.hideOptions()

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
    this.showOptions()
  })
  this.input.addEventListener('blur', () => {
    this.hideOptions()
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

  removeButton.addEventListener('mousedown', this.removeTag.bind(this, tag))

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
  handleDuplicate
\******************************************************************************/

prototype.handleDuplicate = function handleDuplicate () {
  this.dispatchEvent(new CustomEvent('error', {
    detail: 'duplicate'
  }))
}





/******************************************************************************\
  handleInvalid
\******************************************************************************/

prototype.handleInvalid = function handleInvalid () {
  this.dispatchEvent(new CustomEvent('error', {
    detail: 'invalid'
  }))
}





/******************************************************************************\
  handleDelete
\******************************************************************************/

prototype.handleDelete = function handleDelete () {
  if (this.shouldCaptureKeybind()) {
    event.preventDefault()

    let selectedTag = this.tagList.querySelector('.focus')

    if (selectedTag) {
      let previousTag = selectedTag.previousElementSibling

      if (previousTag) {
        previousTag.classList.add('focus')
      }

      this.removeTag(selectedTag)

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
    case 188: // comma
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
}





/******************************************************************************\
  handleOptionClick
\******************************************************************************/

prototype.handleOptionClick = function handleOptionClick (event) {
  event.preventDefault()

  let target = event.target
  let value = target.innerText

  this.log('group', 'handleOptionClick')
  this.log('value', value)
  this.log('target', target)
  this.log(this.input)
  this.log('groupEnd')

  if (this.addTag(value)) {
    this.clearInput()
    this.clearOptions()
  }

  this.input.focus()
}




/******************************************************************************\
  handleReturn
\******************************************************************************/

prototype.handleReturn = function handleReturn (event) {
  let firstOption = this.optionList.querySelector('li:first-of-type')
  let selectedOption = this.optionList.querySelector('.focus')
  let value

  if (this.allowNew) {
    value = this.input.value
  } else if (firstOption) {
    value = firstOption.innerText
  }

  if (selectedOption) {
    value = selectedOption.innerText
  }

  if (!this.allowNew && !firstOption) {
    this.handleInvalid()
    return
  }

  if (value) {
    if (this.checkDuplicate(value)) {
      return
    }

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
  }
}





/******************************************************************************\
  hideOptions
\******************************************************************************/

prototype.hideOptions = function hideOptions () {
  this.optionList.classList.add('hide')
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
  isDuplicate
\******************************************************************************/

prototype.isDuplicate = function isDuplicate (value) {
  return this.value.indexOf(value) !== -1
}





/******************************************************************************\
  log
\******************************************************************************/

prototype.log = function log () {
  // Default to using console.log
  let type = 'log'

  // Check to see if the first argument passed is a console function. If so,
  // remove it from the arguments and use it instead of log
  if (Object.keys(console).indexOf(arguments[0]) !== -1) {
    type = [].shift.call(arguments)
  }

  if (this.debug) {
    console[type].apply(this, arguments)
  }
}





/******************************************************************************\
  removeTag
\******************************************************************************/

prototype.removeTag = function removeTag (tag) {
  let value = tag.querySelector('span').innerText

  this.value.splice(this.value.indexOf(value), 1)

  tag.querySelector('button').removeEventListener('mousedown', this.removeTag)
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
  showOptions
\******************************************************************************/

prototype.showOptions = function showOptions () {
  this.optionList.classList.remove('hide')
}





/******************************************************************************\
  updateAttribute
\******************************************************************************/

prototype.updateAttribute = function updateAttribute (attribute, property) {
  let hasAttribute = this.hasAttribute(attribute)
  let value = this.getAttribute(attribute)

  // If the attribute doesn't exist, we'll just return false
  if (!hasAttribute) {
    value = false

  // getAttribute returns an empty string for boolean attributes
  } else if (typeof value === 'string' && value === '') {
    value = true
  }

  if (typeof value === 'string' && /(true|false)/gi.test(value)) {
    value = value.toLowerCase() === 'true'
  }

  this[property] = value
}





/******************************************************************************\
  updateOptions
\******************************************************************************/

prototype.updateOptions = function updateOptions (options) {
  options.forEach(option => {
    let optionElement = this.createOption(option)

    optionElement.addEventListener('mousedown', this.handleOptionClick.bind(this))

    this.optionList.appendChild(optionElement)
  })
}





document.registerElement('tags-input', {
  prototype: prototype
})
