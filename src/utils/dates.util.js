const moment = require('moment-timezone')

exports.getIsoDate = (date) => {
  const argTz = 'America/Argentina/Buenos_Aires'
  const format = 'DD-MM-YYYY' // should add time as well?
  return date === 'today' 
    ? moment().tz(argTz).toISOString()
    : moment(date, format).tz(argTz).toISOString()
}
