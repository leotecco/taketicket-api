const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const dotenvSafe = require('dotenv-safe')
const cors = require('cors')
const AWS = require('aws-sdk')

const PORT = process.env.PORT || 3000

dotenvSafe.config()

const authService = require('./src/services/auth-service')
const indexRoute = require('./src/routes/index-routes')
const eventRoutes = require('./src/routes/event-routes')
const saleRoutes = require('./src/routes/sale-routes')
const purchaseRoutes = require('./src/routes/purchase-routes')
const publicEventRoutes = require('./src/routes/public-event-routes')
const authRoutes = require('./src/routes/auth-routes')

mongoose.connect(
  'mongodb://Rafael12345:1234@cluster0-shard-00-00-7a7r3.mongodb.net:27017,cluster0-shard-00-01-7a7r3.mongodb.net:27017,cluster0-shard-00-02-7a7r3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

AWS.config.update({
  region: process.env.AWS_REGION,
})

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/v1', indexRoute)
app.use('/v1/auth', authRoutes)
app.use('/v1/events', authService, eventRoutes)
app.use('/v1/sales', authService, saleRoutes)
app.use('/v1/purchases', authService, purchaseRoutes)
app.use('/v1/public-events', publicEventRoutes)

app.listen(PORT, () => {
  console.log('================')
  console.log('SERVER ON')
  console.log('PORT:', PORT)
  console.log('================')
})
