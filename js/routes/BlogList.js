import Route from '../Route'
import BlogListView from 'views/BlogList'
import BlogsCollection from 'collections/Blogs'





export default class BlogList extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.collection = this.appChannel.request('blogs')
      this.viewOptions.model = this.viewOptions.collection.data

      this.viewOptions.collection.getPage(params.page ? parseInt(params.page) : 1, {
        error: reject,
        success: resolve
      })
    })
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get replaceElement () {
    return true
  }

  get title () {
    return 'Blogs'
  }

  get view () {
    return BlogListView
  }
}
