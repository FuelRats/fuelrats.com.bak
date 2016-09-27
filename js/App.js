import Backbone from 'backbone'
import Rafael from 'rafael'

import Router from './Router'
import Routes from './Routes'
import RootView from 'views/Root'

import UserModel from 'models/User'
import AuthorsCollection from 'collections/Authors'
import BlogsCollection from 'collections/Blogs'
import CategoriesCollection from 'collections/Categories'
import PagesCollection from 'collections/Pages'
import CMDRsCollection from 'collections/CMDRs'
import UsersCollection from 'collections/Users'





export default class App extends Backbone.Marionette.Application {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.routerChannel.on('before:navigate', () => {
      // Add loading class to the main element if it's been referenced
      if (this.main.el instanceof HTMLElement) {
        this.main.el.classList.remove('error')
        this.main.el.classList.add('loading')
      }

      // Empty the main region to allow the original element to return
      this.main.empty()
    })

    this.routerChannel.on('navigate', (route) => {
      // Remove the loading class on navigate
      this.main.el.classList.remove('error', 'loading')

      // Update the page title
      this.title.innerHTML = `${route.title} | ${this.baseTitle}`

      // Update analytics
      if (window.ga) {
        ga('set', 'page', location.pathname)
        ga('send', 'pageview')
      }
    })

    this.routerChannel.on('error', () => {
      // Remove the loading class on navigate
      if (this.main.el instanceof HTMLElement) {
        this.main.el.classList.remove('loading')
        this.main.el.classList.add('error')
      }
    })

    this.appChannel.reply('authors', this.authors)
    this.appChannel.reply('blogs', this.blogs)
    this.appChannel.reply('categories', this.categories)
    this.appChannel.reply('CMDRs', this.CMDRs)
    this.appChannel.reply('pages', this.pages)
    this.appChannel.reply('user', this.user)
    this.appChannel.reply('users', this.users)
    this.appChannel.reply('scheduler', this.scheduler)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    // We need to use `.extend()` to pass in the routes because ES6 doesn't
    // allow properties to be set before initialization
    this.Router = new (Router.extend(Routes))
  }

  onStart () {
    // Bind application-wide events
    this._bindEvents()

    // Grab the title element. We'll use this reference to update the page
    // title when we navigate
    this.title = document.querySelector('title')
    this.baseTitle = this.title.innerHTML

    // The RootView will render itself so that we don't need to do it manually
    this.RootView = new RootView

    // The `main` region is where we'll show pretty much every view so we'll
    // attach it to the app object for easy access
    this.main = this.RootView.getRegion('main')

    // Start the router with push routing
    Backbone.history.start({
      pushState: true
    })

    // Backbone.Intercept prevents anchors and form submissions from changing
    // the URL
    Backbone.Intercept.start()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get authors () {
    return this._authors || (this._authors = new AuthorsCollection)
  }

  get blogs () {
    return this._blogs || (this._blogs = new BlogsCollection)
  }

  get categories () {
    return this._categories || (this._categories = new CategoriesCollection)
  }

  get CMDRs () {
    return this._CMDRs || (this._CMDRs = new CMDRsCollection)
  }

  get pages () {
    return this._pages || (this._pages = new PagesCollection)
  }

  get scheduler () {
    return this._scheduler || (this._scheduler = new Rafael)
  }

  get user () {
    return this._user || (this._user = new UserModel)
  }

  get users () {
    return this._users || (this._users = new UsersCollection)
  }

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }
}
