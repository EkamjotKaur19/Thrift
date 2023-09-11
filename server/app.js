const config = require('./utils/config')
const express = require('express')
const multer = require('multer')
const app = express()
const cors = require('cors')
const itemsRouter = require('./controllers/items')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const ordersRouter = require('./controllers/order')
const msgsRouter = require('./controllers/message')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const storage = multer.memoryStorage(); // Save files in memory
const upload = multer({ storage: storage });
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/items', itemsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/msgs', msgsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app