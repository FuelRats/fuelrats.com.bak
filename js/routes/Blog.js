import Route from '../Route'
import BlogView from 'views/Blog'
import BlogsCollection from 'collections/Blogs'





export default class Blog extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.model = this.appChannel.request('blog', params.id)

      if (this.viewOptions.model.get('loaded')) {
        resolve()

      } else {
        this.viewOptions.model.fetch({
          error: reject,
          success: resolve
        })
      }
    })
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get replaceElement () {
    return false
  }

  get title () {
    return this.viewOptions.model.get('title')
  }

  get view () {
    return BlogView
  }
}
