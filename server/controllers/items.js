const itemsRouter = require('express').Router()
const Item = require('../models/items')
const jwt = require('jsonwebtoken')
const User = require('../models/users')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

itemsRouter.get('/', (request, response) => {
  Item.find({}).then(items => {
    response.json(items)
  })
})

itemsRouter.get('/:id', (request, response, next) => {
  Item.findById(request.params.id)
    .then(item => {
      if (item) {
        response.json(item)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


itemsRouter.post('/', async (request, response) => {
  const body = request.body;
  console.log(body)
  console.log(body.name)
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, 'admin')
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
    const item = new Item({
      name: body.name,
      category: body.category,
      color: body.color,
      size: body.size,
      price: body.price,
      description: body.description,
      images: body.images,
      seller: user._id,
    });

    const savedItem = await item.save();
    user.items = user.items.concat(savedItem._id);
    await user.save();

    response.status(201).json(savedItem);
});

itemsRouter.delete('/:id', (request, response, next) => {
  Item.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

itemsRouter.put('/:id', (request, response, next) => {
  const body = request.body

    const item = {
        name:body.name,
        category:body.category,
        color:body.color,
        size:body.size,
        price:body.price,
        description:body.description,
        seller:body.seller,
        images:body.images,
    }

  Item.findByIdAndUpdate(request.params.id, item, { new: true })
    .then(updateditem => {
      response.json(updateditem)
    })
    .catch(error => next(error))
})

module.exports = itemsRouter