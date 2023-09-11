const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/users')
const Items = require('../models/items')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('items', { content: 1, date: 1 });

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  console.log(id)
  const user = await User.findById(id)
  console.log(user)
  const itemIds = user.items
  console.log(itemIds)
  let itemList=[];
  for(let i=0; i<itemIds.length; i++){
    await Items
    .findById(itemIds[i])
    .then(item=>  {if(item!==null) itemList.push(item)})
}
  console.log(itemList)
  response.json(itemList)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter