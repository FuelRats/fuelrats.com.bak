import Backbone from 'backbone'
import Rafael from 'rafael'

import Router from './Router'
import Routes from './Routes'
import RootView from 'views/Root'

import BlogsCollection from 'collections/Blogs'
import TweetsCollection from 'collections/Tweets'





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
      ga('set', 'page', location.pathname)
      ga('send', 'pageview')
    })

    this.routerChannel.on('error', () => {
      // Remove the loading class on navigate
      if (this.main.el instanceof HTMLElement) {
        this.main.el.classList.remove('loading')
        this.main.el.classList.add('error')
      }
    })

    this.appChannel.reply('scheduler', this.scheduler)
  }

  _getBlog (id) {
    let blog = this.blogs.findWhere({
      _id: id
    })

    if (!blog) {
      blog = this.blogs.add({
        _id: id
      })
    }

    return blog
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
    // Grab the title element. We'll use this reference to update the page
    // title when we navigate
    this.title = document.querySelector('title')
    this.baseTitle = this.title.innerHTML

    // The RootView will render itself so that we don't need to do it manually
    this.RootView = new RootView

    // The `main` region is where we'll show pretty much every view so we'll
    // attach it to the app object for easy access
    this.main = this.RootView.getRegion('main')

    // Bind application-wide events
    this._bindEvents()

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

  get blogs () {
    if (!this._blogs) {
      this._blogs = new BlogsCollection
    }

    return this._blogs
  }

  get scheduler () {
    if (!this._scheduler) {
      this._scheduler = new Rafael
    }

    return this._scheduler
  }

  get tweets () {
    if (!this._tweets) {
      this._tweets = new TweetsCollection
    }

    return this._tweets
  }

  get appChannel () {
    if (!this._appChannel) {
      this._appChannel = Backbone.Radio.channel('application')
    }

    return this._appChannel
  }

  get routerChannel () {
    if (!this._routerChannel) {
      this._routerChannel = Backbone.Radio.channel('router')
    }

    return this._routerChannel
  }
}
