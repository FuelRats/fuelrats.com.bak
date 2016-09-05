import Route from '../Route'
import BlogView from 'views/Blog'





export default class Blog extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      let blogs = this.appChannel.request('blogs')

      this.viewOptions.model = blogs.findWhere({id: params.id})

      if (this.viewOptions.model) {
        resolve()

      } else {
        this.viewOptions.model = blogs.add({id: params.id})
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
    return this.viewOptions.model.get('title').rendered
  }

  get view () {
    return BlogView
  }
}
