import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import TweeterRoute from 'routes/Tweeter'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/:id(/)': new BlogRoute,
    'blog(/)': new BlogListRoute,
    'tweeter(/)': new TweeterRoute,
    '*notfound': new AboutRoute
  }
}
