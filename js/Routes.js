import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import HomeRoute from 'routes/Home'
import LoginRoute from 'routes/Login'
import LogoutRoute from 'routes/Logout'
import RescueListRoute from 'routes/RescueList'
import TweeterRoute from 'routes/Tweeter'
import UserAdminTableRoute from 'routes/UserAdminTable'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/:id(/)': new BlogRoute,
    'blog/page/:page(/)': new BlogListRoute,
    'blog(/)': new BlogListRoute,
    'home(/)': new HomeRoute,
    'login(/)': new LoginRoute,
    'logout(/)': new LogoutRoute,
    'rescues/page/:page(/)': new RescueListRoute,
    'rescues(/)': new RescueListRoute,
    'tweeter(/)': new TweeterRoute,
    'users/page/:page(/)': new UserAdminTableRoute,
    'users(/)': new UserAdminTableRoute,
    '*notfound': new HomeRoute
  }
}
