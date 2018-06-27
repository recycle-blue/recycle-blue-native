const router = require('express').Router()
const db = require('../db')
const {User, Activity, Product, Milestone, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Milestone]
    })
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
      include: [Product, Category]
    })
    res.json(activities)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/friends', async (req, res, next) => {
  try {
    const {Friends} = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: ['Friends']
    })
    const friends = await User.friendsInAlphabeticalOrder(Friends)
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/friends/:friendId', async (req, res, next) => {
  try {
    const friend = await User.findById(req.params.friendId, {
      include: [Milestone]
    })
    res.json(friend)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/friends/:friendId/activities', async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      where: {
        userId: req.params.friendId
      },
      include: [Product, Category]
    })
    res.json(activities)
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

// post route to follow another user

router.post('/:userId/followees/:followeeId', async (req, res, next) => {
  const [currentUser, followee] = await Promise.all([
    User.findById(req.params.userId),
    User.findById(req.params.followeeId)
  ])
  await currentUser.addFollowee(followee)
  res.json(followee)
})
