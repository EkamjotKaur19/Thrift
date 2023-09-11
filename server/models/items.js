const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url =  'mongodb+srv://ekamjot19:Ekamjot@cluster0.uyzqpki.mongodb.net/thrift?retryWrites=true&w=majority'


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB')
  })

  const itemSchema = new mongoose.Schema({
    name:String,
    category:String,
    color:String,
    size:String,
    price:Number,
    description:String,
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
      },
    images:[String]
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Item', itemSchema)