const { ExpenseModel } = require('../models')
const {
  queryHelper: { createBaseQuery },
  datesUtil: { now }
} = require('../utils')

exports.post = (req, res, next) => {
  const { price, category, description } = req.body
  if(!price || !category) {
    res.status(500).send({ error: 'You need to specify both Price and Type' })
    return
  }
  const expense = { price, category, description, date: now().toISOString() }
  ExpenseModel.create(expense, (err, doc) => {
    if (err) {
      throw new Error('There was an error on the ExpenseModel creation', req.body, err)
    }
    res.status(201).send({ success: true }) // maybe send whole day data?
  })
}

exports.get = (req, res, next) => {
  const query = createQuery(req.query)
  ExpenseModel.find(query, (err, docs) => {
    if (err) {
      throw new Error('There was on the ExpenseModel query', req.query, err)
    }
    res.send(docs)
  })
}

const createQuery = ({ category, ...params }) => {
  let query = createBaseQuery(params)
  if(category) Object.assign(query, { category })
  return query
}
