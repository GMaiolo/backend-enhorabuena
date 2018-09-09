const moment = require('moment-timezone')

const argTz = 'America/Argentina/Buenos_Aires'
const baseFormat = 'DD-MM-YYYY' // should add time as well?

const now = () => moment().tz(argTz)
const getArgDate = (date) => moment(date, baseFormat).tz(argTz)
const getIsoDate = (date) => getArgDate(date, baseFormat).toISOString()

module.exports = {
  argTz, now, getArgDate, getIsoDate
}
