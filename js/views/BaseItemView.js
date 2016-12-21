import _ from 'underscore'
import Backbone from 'backbone'





export default class BaseItemView extends Backbone.Marionette.ItemView {
  serializeModel (model) {
    return (model.toViewJSON || model.toJSON).apply(model, _.rest(arguments))
  }
}
