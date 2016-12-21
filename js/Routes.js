import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import HomeRoute from 'routes/Home'
import LoginRoute from 'routes/Login'
import LogoutRoute from 'routes/Logout'
import PaperworkRoute from 'routes/Paperwork'
import ProfileRoute from 'routes/Profile'
import RatAdminTableRoute from 'routes/RatAdminTable'
import RescueAdminTableRoute from 'routes/RescueAdminTable'
import RescueRoute from 'routes/Rescue'
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
    'paperwork(/)': new PaperworkRoute,
    'paperwork/:id(/)': new PaperworkRoute,
    'profile(/)': new ProfileRoute,
    'rats/page/:page(/)': new RatAdminTableRoute,
    'rats(/)': new RatAdminTableRoute,
    'rescues/page/:page(/)': new RescueAdminTableRoute,
    'rescues/:id(/)': new RescueRoute,
    'rescues(/)': new RescueAdminTableRoute,
    'tweeter(/)': new TweeterRoute,
    'users/page/:page(/)': new UserAdminTableRoute,
    'users(/)': new UserAdminTableRoute,
    '*notfound': new HomeRoute
  }
}
