// import all required library
const express = require('express')
const app = express()
const logger = require('morgan')
const router = require('./src/index')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

// use the library
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(fileUpload())

// port setting
const port = process.env.SERVER_PORT 

// image
app.use(express.static(__dirname + '/uploads'));

// parent route
app.use('/api', router)

// listening to port
app.listen(port, () => {
  console.log('listening to port ' + port)
})

// page not found handler
app.get('*', (req, res) => {
  console.log('404 not found')
})