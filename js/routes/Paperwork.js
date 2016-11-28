import Route from '../Route'
import PaperworkView from 'views/Paperwork'
import RescueModel from 'models/Rescue'





export default class Paperwork extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/
  loadData (params) {
    return new Promise((resolve, reject) => {
      let promises = []
      let rescues = this.appChannel.request('rescues')

      if (params.id) {
        this.viewOptions.model = rescues.findWhere({id: params.id})

        if (this.viewOptions.model) {
          resolve()

        } else {
          this.viewOptions.model = rescues.add({id: params.id})
          this.viewOptions.model.fetch({
            error: reject,
            success: () => {
              this.viewOptions.model.get('rats').forEach(rat => {
                promises.push(new Promise((resolve, reject) => {
                  rat.fetch({
                    error: reject,
                    success: resolve
                  })
                }))
              })

              promises.push(new Promise((resolve, reject) => {
                this.viewOptions.model.get('firstLimpet').fetch({
                  error: reject,
                  success: resolve
                })
              }))

              Promise.all(promises)
              .then(resolve)
              .catch(reject)
            }
          })
        }

      } else {
        this.viewOptions.model = rescues.add({})

        resolve()
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
    return 'Paperwork'
  }

  get view () {
    return PaperworkView
  }
}
