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

mongoose.connect('mongodb+srv://trello:' + password + '@trellocluster-pkpt1.mongodb.net/test?retryWrites=true')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../dist')))

app.use('/boards', boardRoutes)
app.use('/list', listRoutes)
app.use('/card', cardRoutes)
