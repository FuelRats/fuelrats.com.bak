import Route from '../Route'
import RescueView from 'views/Rescue'
import RescueModel from 'models/Rescue'





export default class Rescue extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/
  loadData (params) {
    return new Promise((resolve, reject) => {
      let promises = []

      if (params.id) {
        this.viewOptions.model = new RescueModel({id: params.id})
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
              let firstLimpet = this.viewOptions.model.get('firstLimpet')

              if (firstLimpet) {
                this.viewOptions.model.get('firstLimpet').fetch({
                  error: reject,
                  success: resolve
                })

              } else {
                resolve()
              }
            }))

            Promise.all(promises)
            .then(() => {
              resolve()
            })
            .catch(reject)
          }
        })

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
    return this._replaceElement || (this._replaceElement = false)
  }

  get title () {
    return 'Rescue Details'
  }

  get view () {
    return RescueView
  }
}
