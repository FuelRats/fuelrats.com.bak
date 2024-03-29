import dialogPolyfill from 'dialog-polyfill'
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
    let user = this.appChannel.request('user')
    let userRescues = user.get('rescues')

    this.getRegion('header').show(new HeaderView, {
      replaceElement: true
    })

    this.getRegion('dialog').show(new DialogView, {
      replaceElement: true
    })

    this.getRegion('userMenu').show(new UserMenuView({
      model: user
    }), {
      replaceElement: true
    })

//    this.getRegion('reminders').show(new RemindersView({
//      collection: userRescues
//    }), {
//      replaceElement: true
//    })

    let dialogs = document.querySelectorAll('dialog')
    for (let i = 0, length = dialogs.length; i < length; i++) {
      dialogPolyfill.registerDialog(dialogs[i])
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

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
