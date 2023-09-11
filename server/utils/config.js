require('dotenv').config()

const PORT = 3001
const MONGODB_URI = 'mongodb+srv://ekamjot19:Ekamjot@cluster0.uyzqpki.mongodb.net/thrift?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}