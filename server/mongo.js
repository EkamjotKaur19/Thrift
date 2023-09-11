const mongoose = require('mongoose')
const url = 'mongodb+srv://ekamjot19:Ekamjot@cluster0.uyzqpki.mongodb.net/thrift?retryWrites=true&w=majority'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const itemSchema = new mongoose.Schema({
    name:String,
    category:String,
    color:String,
    size:String,
    price:Number,
    description:String,
    seller:Object,
    images:Array
})

const Item = mongoose.model('Item', itemSchema)

const item = new Item({
  name: 'floral blouse',
  category: 'Tops',
  color: 'Yellow',
  size: 'Medium',
  price: 19.99,
  description: "A vibrant yellow floral print blouse for a fresh look.",
  seller: {
    id: 105,
    name: "Sophia Seller",
    email: "sophia@example.com"
  },
  images: [
    "image_url9.jpg",
    "image_url10.jpg"
  ]
})

item.save().then(result => {
  console.log('item saved!')
  mongoose.connection.close()
})