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

prototype.createdCallback = function () {
  this.value = []
  this.tagList = document.createElement('ul')
  this.input = document.createElement('input')

  this.input.addEventListener('keydown', this.handleInput.bind(this))

  let startingValue = this.getAttribute('value')
  if (startingValue) {
    startingValue.split(',').forEach(this.addTag)
  }

  this.allowDupes = !!this.getAttribute('data-allow-duplicates')

  this.createShadowRoot()
  this.shadowRoot.appendChild(this.tagList)
  this.shadowRoot.appendChild(this.input)
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

prototype.handleReturn = function () {
  let value = this.input.value
  if (value) {
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

prototype.handleInput = function (event) {
  switch (event.which) {
    case 9:
    case 13:
      if (this.input.value) {
        this.handleReturn()
      }
      break
  }
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

document.registerElement('tags-input', {
  prototype: prototype
})
