const router = require('express').Router()
const { Milestone, User } = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    include: [{
      model: Milestone
    }]
  })
  if (!user) {
    res.status(401).send('Wrong username and/or password')
  } else if (!user.correctPassword(req.body.password)) {
    res.status(401).send('Wrong username and/or password')
  } else {
    req.login(user, err => (err ? next(err) : res.json(user)))
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    console.log('In Sign Up',req.body);
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
