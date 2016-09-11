import moment from 'moment'





import BaseModel from 'models/Base'





export default class Author extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    if (!response.parsed) {
      response.avatar = response.avatar_urls['96']

      // Clean up unnecessary attributes
      delete response._links
      delete response.avatar_urls
      delete response.link

      // Mark as parsed so it doesn't get parsed again
      response.parsed = true
    }

    return response
  }
}
