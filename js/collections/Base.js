import Backbone from 'backbone'





export default class Base extends Backbone.Collection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (models, options) {
    super(models, options)

    this.sync = new Backbone.Hoard.Control().getModelSync()
  }

  fetch (options) {
    options = options || {}

    let ids = []

    this.forEach(model => {
      if (!model.get('loaded')) {
        ids.push(model.get('id'))
      }
    })

    if (options.bulk) {
      options.data = {
        id: ids,
        limit: ids.length
      }
    }

    super.fetch(options)
  }
}
