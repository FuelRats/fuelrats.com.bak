import WordpressCollection from 'collections/Wordpress'
import Blog from 'models/Blog'





export default class Blogs extends WordpressCollection {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Blog
  }

  get url () {
    return '/wp-api/posts/'
  }
}
