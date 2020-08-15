const fs = require('fs')
const path = require('path')

const express = require('express')
const expressFileUpload = require('express-fileupload')

const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../.env') })

const app = express()
const port = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(expressFileUpload())

app.use('/movies', require('./movies/moviesAPI'))

if (process.env.NODE_ENV === 'production') {
  const level = 1
  const stream = fs.createWriteStream(path.join(__dirname, 'server.js.log'), { flags: 'a' })

  app.use(compression({ level }))
  app.use(morgan('combined', { stream }))
  app.use(helmet({
    referrerPolicy: {
      policy: 'no-referrer'
    },
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none'
    }
  }))
}

app.listen({ port }, () => { console.log('🚀 Homeflix is Ready!') })
