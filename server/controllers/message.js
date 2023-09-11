const msgsRouter = require('express').Router()
const Message = require('../models/message')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

msgsRouter.get('/', (request, response) => {
  Message.find({}).then(msgs => {
    response.json(msgs)
  })
})

//Find by receiver id
msgsRouter.get('/:receiverId', (request, response, next) => {
    console.log('called')
    const receiverId = request.params.receiverId;
    Message.find({ receiver: receiverId })
      .then(messages => {
        response.json(messages);
      })
      .catch(error => next(error));
  });
  




module.exports = msgsRouter