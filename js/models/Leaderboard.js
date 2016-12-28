import moment from 'moment'
import BaseModel from 'models/Base'





export default class Leaderboard extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    response.joined = moment(response.joined)
    response.rescueCount = parseInt(response.rescueCount)

    // Show the dispatch badge if the rat has been dispatch drilled
    this.set('hasDispatch', response.drilledDispatch || false)

    // Show the epic badge if the rat has any epic rescues
    this.set('hasEpic', (response.epicRescues && response.epicRescues.length) || false)

    // Show the code red badge if the rat has completed a successful code red
    this.set('hasCodeRed', response.codeRed || false)

    // Any rat that joined before 2016 gets the 3301 badge. Technically they
    // need to have made a rescue before 2016, but that's expensive.
    this.set('has3301', response.joined.isBefore(new Date('2016')))

    // Rats get another pip for every 100 rescues up to 400
    this.set('hasFirstPip', response.rescueCount >= 100)
    this.set('hasSecondPip', response.rescueCount >= 200)
    this.set('hasThirdPip', response.rescueCount >= 300)
    this.set('hasFourthPip', response.rescueCount >= 400)

    // Rats get the small crown for reaching 500 rescues
    this.set('hasSmallCrown', response.rescueCount >= 500)

    // Rats get the large crown for reaching 1000 rescues
    this.set('hasLargeCrown', response.rescueCount >= 1000)

    return response
  }
}
