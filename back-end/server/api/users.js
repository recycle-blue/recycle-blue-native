const router = require('express').Router()
const db = require('../db')
const {User, Activity, Product, Milestone, Category} = require('../db/models')
const Friends = db.model('friends')
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
    const user = await User.findById(req.params.userId, {include: [Milestone]})
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
      include: [Product, Category, User]
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
      include: [Product, Category, User]
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

router.get('/:userId/feed', async (req, res, next) => {
  try {
    const friends = await Friends.findAll({
      where: {
        myId: req.params.userId
      }
    })
    const initialFeed = await Promise.all([
      ...friends.map(friend => {
        return Activity.findAll({
          where: {userId: friend.friendId},
          include: [Product, Category, User]
        })
      }),
      Activity.findAll({
        where: {userId: req.params.userId},
        include: [Product, Category, User]
      })
    ])
    const finalFeed = await generateFeed(initialFeed)
    res.json(finalFeed)
  } catch (err) {
    next(err)
  }
})

// post route to follow another user

router.post('/:userId/friends/:friendId', async (req, res, next) => {
  await Friends.create({
    myId: req.params.userId,
    friendId: req.params.friendId
  })
  const friend = await User.findById(req.params.friendId)
  res.json(friend)
})

const generateFeed = initialFeed =>
  initialFeed.reduce((prev, curr) => {
    curr.forEach(activity => {
      if (prev.length > 0) {
        let i = 0
        for (; i < prev.length; i++) {
          if (activity.createdAt > prev[i].createdAt) {
            prev.splice(i, 0, activity)
            break
          }
        }
        if (i === prev.length) prev.push(activity)
      } else {
        prev.push(activity)
      }
    })
    return prev
  }, [])
