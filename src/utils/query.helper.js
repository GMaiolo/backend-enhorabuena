const { getArgDate } = require('./dates.util')

const createBaseQuery = ({ date, fromDate, toDate, fromPrice, toPrice }) => {
  let query = {}
  if(date) {
    const argDate = getArgDate(date)
    Object.assign(query, {
      date: {
        $gte: argDate.startOf('day').toISOString(),
        $lt: argDate.endOf('day').toISOString()
      }
    })
  }
  else if(fromDate || toDate) {
    query.date = {}
    if(fromDate) Object.assign(query.date, { $gte: getArgDate(fromDate).toISOString() })
    if(toDate) Object.assign(query.date, { $lt: getArgDate(toDate).toISOString() })
  }
  if(fromPrice || toPrice) {
    query.price = {}
    if(fromPrice) Object.assign(query.price, { $gte: fromPrice })
    if(toPrice) Object.assign(query.price, { $lt: toPrice })
  }
  return query
}

module.exports = {
  createBaseQuery
}