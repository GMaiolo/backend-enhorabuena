const { ExpenseModel } = require('../models')
const { datesUtil: { getIsoDate } } = require('../utils')

exports.post = (req, res, next) => {
  const { price, category, description } = req.body
  if(!price || !category) {
    res.status(500).send({ error: 'You need to specify both Price and Type' })
    return
  }
  const expense = { price, category, description, date: new Date() }
  ExpenseModel.create(expense, (err, doc) => {
    if (err) return next(err)
    res.status(201).send({ success: true }) // maybe send whole day data?
  })
}

exports.get = (req, res, next) => {
  const query = createQuery(req.query)
  ExpenseModel.find(query, (err, docs) => {
    if (err) return next(err)
    res.send(docs)
  })
}

const createQuery = ({ category, date, fromDate, toDate, fromPrice, toPrice }) => {
  let query = {}
  if(category) Object.assign(query, { category })
  if(date) {
    const isoDate = getIsoDate(date)
    Object.assign(query, { date: isoDate })
    return query
  }
  if(fromDate || toDate) {
    query.date = {}
    if(fromDate) Object.assign(query.date, { $gte: getIsoDate(fromDate) })
    if(toDate) Object.assign(query.date, { $lt: getIsoDate(toDate) })
  }
  if(fromPrice || toPrice) {
    query.price = {}
    if(fromPrice) Object.assign(query.price, { $gte: fromPrice })
    if(toPrice) Object.assign(query.price, { $lt: toPrice })
  }
  return query
}
