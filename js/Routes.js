import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import HomeRoute from 'routes/Home'
import TweeterRoute from 'routes/Tweeter'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/:id(/)': new BlogRoute,
    'blog(/)': new BlogListRoute,
    'Home(/)': new HomeRoute,
    'tweeter(/)': new TweeterRoute,
    '*notfound': new HomeRoute
  }
}
