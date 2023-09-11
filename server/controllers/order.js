const ordersRouter = require('express').Router()
const Order = require('../models/order')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


ordersRouter.get('/', (request, response) => {
  Order.find({}).then(orders => {
    response.json(orders)
  })
})

ordersRouter.get('/:id', (request, response, next) => {
  Order.findById(request.params.id)
    .then(order => {
      if (order) {
        response.json(order)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


ordersRouter.post('/', async (request, response) => {
  const body = request.body;
  console.log(body)
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, 'admin')
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
    const order = new Order({
      name: body.name,
      price: body.price,
      seller: body.seller,
      buyer: body.user
    });

    const savedorder = await order.save();
    user.orders = user.orders.concat(savedorder._id);
    await user.save();
    response.status(201).json(savedorder);
});

ordersRouter.delete('/:id', (request, response, next) => {
  Order.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = ordersRouter