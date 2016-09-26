import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import HomeRoute from 'routes/Home'
import LeaderboardRoute from 'routes/Leaderboard'
import LoginRoute from 'routes/Login'
import TweeterRoute from 'routes/Tweeter'
import UserListRoute from 'routes/UserList'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/:id(/)': new BlogRoute,
    'blog/page/:page(/)': new BlogListRoute,
    'blog(/)': new BlogListRoute,
    'home(/)': new HomeRoute,
    'leaderboard(/)': new LeaderboardRoute,
    'login(/)': new LoginRoute,
    'tweeter(/)': new TweeterRoute,
    'users(/)': new UserListRoute,
    '*notfound': new HomeRoute
  }
}
