import Backbone from 'backbone'

import DialogView from 'views/Dialog'
import HeaderView from 'views/Header'
import RemindersView from 'views/Reminders'
import UserMenuView from 'views/UserMenu'
import template from 'templates/Root.hbs'





export default class Root extends Backbone.Marionette.LayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this.render()
  }

  onRender () {
    this.getRegion('header').show(new HeaderView, {
      replaceElement: true
    })

    this.getRegion('dialog').show(new DialogView, {
      replaceElement: true
    })

    this.getRegion('userMenu').show(new UserMenuView({
      model: Backbone.Radio.channel('application').request('user')
    }), {
      replaceElement: true
    })

    this.getRegion('reminders').show(new RemindersView({
      collection: Backbone.Radio.channel('application').request('rescues')
    }), {
      replaceElement: true
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get el () {
    return 'body'
  }

  get regions () {
    return this._regions || (this._regions = {
      dialog: '> dialog',
      footer: '> footer',
      header: '> header',
      main: 'main',
      reminders: '> .reminders',
      userMenu: '> menu'
    })
  }

  get template () {
    return template
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
