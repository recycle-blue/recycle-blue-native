const router = require('express').Router()
const db = require('../db')
const {User, Activity, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/activities', async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      where: {
        userId: req.params.userId
      },
      include: [Product]
    })
    res.json(activities)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/followees', async (req, res, next) => {
  try {
    const {Followees} = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: ['Followees']
    })
    const followees = await User.followeesInAlphabeticalOrder(Followees)
    res.json(followees)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/followees/:followeeId', async (req, res, next) => {
  try {
    const followee = await User.findById(req.params.followeeId)
    res.json(followee)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/leaderboard', async (req, res, next) => {
  try {
    const {Friends} = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: ['Friends']
    })
    const currentUser = await User.findById(req.params.userId)
    const users = await User.leaderboard(currentUser, Friends)
    res.json(users)
  } catch (err) {
    next(err)
  }
})
