import moment from 'moment'





// usage: {{moment creation_date format="MMMM YYYY"}}
module.exports = function (context, block) {
  let f = block.hash.format || 'MMM DD, YYYY hh:mm:ss A'

  return moment(context).format(f) // had to remove Date(context)
}
