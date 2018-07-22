const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const secret = require('./secret')

// setup
const port = 3000
const app = express()
app.use(bodyParser.json())
mongoose.connect(secret.URI, { useNewUrlParser: true })

// routing
app.post('/expenses', routes.expenses.post)
app.get('/expenses', routes.expenses.get)
app.post('/sales', routes.sales.post)
app.get('/sales', routes.sales.get)

// listener
app.listen(port, () => console.log(`Listening on port ${port}`))
