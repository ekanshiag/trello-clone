const express = require('express')
const app = express()
const mongoose = require('mongoose')
const password = require('./secret')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const boardRoutes = require('./routes/board')
const listRoutes = require('./routes/lists')
const cardRoutes = require('./routes/card')
const cors = require('cors')

const port = process.env.port || 8000
app.listen(port)

mongoose.connect('mongodb+srv://trello:' + password + '@trellocluster-pkpt1.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../dist')))

app.use('/boards', boardRoutes)
app.use('/list', listRoutes)
app.use('/card', cardRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json(err.message)
})
