import Backbone from 'backbone'

import template from 'templates/BlogList.hbs'





export default class BlogList extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)

    // Set the collection to reflect the transformations
    this.model = new Backbone.Model({
      groups: this.blogGroups
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get blogGroups () {
    // We need to modify the collection's data structure. The current structure
    // doesn't lend itself to the type of display we're going for
    return this.collection.chain()

    // Create a clone of each model in the collection to avoid ruining our
    // global blog collection, then set a display date for each blog
    .mapObject((model) => {
      model = model.clone()
      model.set('displayDate', model.get('created_at').format('MMMM YYYY'))
      return model
    })

    // Stick the models in arrays, grouped by year
    .groupBy((model) => {
      return model.get('created_at').format('YYYY')
    })

    // The previous transform sets dates as keys in an object. We need to push
    // the date into the object
    .mapObject((blogs, year) => {


      return {
        blogs: _.sortBy(blogs, (blog) => {
          return -blog.get('created_at')
        }),
        year: year
      }
    })

    // Sort the blogs newest to oldest
    .sortBy((group) => {
      return -group.year
    })

    // Convert the collection to an array, dumping the keys
    .toArray()

    // Return the final transformed object
    .value()
  }

  get tagName () {
    return 'dl'
  }
}
