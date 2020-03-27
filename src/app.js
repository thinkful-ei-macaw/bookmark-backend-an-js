require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, PORT, API_TOKEN } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const error = require('./error')
const bookmarkRouter = require('./bookmark/bookmark-router')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)
app.use(express.json());
app.use(bookmarkRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use(error)

module.exports = app