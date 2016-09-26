import moment from 'moment'





import BaseModel from 'models/Base'





export default class Category extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    if (!response.parsed) {
      // Clean up unnecessary attributes
      delete response._links
      delete response.count
      delete response.link
      delete response.slug
      delete response.taxonomy

      // Mark as parsed so it doesn't get parsed again
      response.parsed = true
    }

    return response
  }
}
