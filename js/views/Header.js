import Backbone from 'backbone'

import NavView from 'views/Nav'
import template from 'templates/Header.hbs'





export default class Header extends Backbone.Marionette.LayoutView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _toggleNavControl () {
    this.ui.navControlLabel.toggleClass('is-active')
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow () {
    this.getRegion('nav').show(new NavView, {
      replaceElement: true
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get attributes () {
    return {
      role: 'banner'
    }
  }

  get events () {
    return this._events || (this._events = {
      'change @ui.navControl': '_toggleNavControl'
    })
  }

  get regions () {
    return this._regions || (this._regions = {
      brand: '.brand',
      nav: 'nav'
    })
  }

  get tagName () {
    return 'header'
  }

  get template () {
    return template
  }

  get ui () {
    return this._ui || (this._ui = {
      navControlLabel: '[for="nav-control"]',
      navControl: '#nav-control'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }

  set regions (value) {
    this._regions = value
  }

  set ui (value) {
    this._ui = value
  }
}
