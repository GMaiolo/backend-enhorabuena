const { SaleModel } = require('../models')
const {
  queryHelper: { createBaseQuery },
  datesUtil: { now }
} = require('../utils')

exports.post = (req, res, next) => {
  const { price, type, payments } = req.body
  if(!price || !type) {
    res.status(500).send({ error: 'You need to specify both Price and Type' })
    return
  }
  if(type === 'credit' && !payments) {
    res.status(500).send({ error: 'You need to specify the Credit Card payments' })
    return
  }
  const sale = { price, type, payments, date: now().toISOString() }
  SaleModel.create(sale, (err, doc) => {
    if (err) {
      throw new Error('There was an error on the SaleModel creation', req.body, err)
    }
    res.status(201).send({ success: true }) // maybe send whole day data?
  })
}

exports.get = (req, res, next) => {
  const query = createQuery(req.query)
  SaleModel.find(query, (err, docs) => {
    if (err) {
      throw new Error('There was on the SaleModel query', req.query, err)
    }
    res.send(docs)
  })
}

const createQuery = ({ type, ...params }) => {
  let query = createBaseQuery(params)
  if(type) Object.assign(query, { type })
  return query
}
