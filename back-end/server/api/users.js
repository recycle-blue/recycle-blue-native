const router = require('express').Router()
const Op = require('sequelize').Op
const db = require('../db')
const { User, Activity, Product, Milestone, Category } = require('../db/models')
const Friends = db.model('friends')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Milestone],
      order: ['firstName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    let [firstName, lastName] = req.query.name && req.query.name.split(' ')
    lastName = lastName || firstName;
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `${firstName}%` } },
          { lastName: { [Op.iLike]: `${lastName}%` } }],
      },
      order: [['firstName', 'ASC']],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, { include: [Milestone] })
    const [potato, bronze, silver, gold] = await Milestone.findAll()
    if ((user.totalPoints >= 0) && (user.totalPoints < 500)) {
      await user.setMilestone(potato)
    }
    if ((user.totalPoints >= 500) && (user.totalPoints < 2000)) {
      await user.setMilestone(bronze)
    }
    if ((user.totalPoints >= 2000) && (user.totalPoints < 5000)) {
      await user.setMilestone(silver)
    }
    if (user.totalPoints >= 5000) {
      await user.setMilestone(gold)
    }
    const updatedUser = await User.findById(req.params.userId, { include: [Milestone] })
    res.json(updatedUser)
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
      include: [Product, Category, User],
      order: [['createdAt', 'DESC']],
    })
    res.json(activities)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/friends', async (req, res, next) => {
  try {
    const { Friends } = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: ['Friends']
    })
    const friends = await User.friendsInAlphabeticalOrder(Friends)
    let response = friends
    if (req.query.res === 'hash') {
      response = {}
      friends.forEach(friend => {
        response[friend.id] = true
      })
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/friends/search', async (req, res, next) => {
  try {
    const getfriends = await Friends.findAll({
      where: {
        myId: req.params.userId
      }
    })
    const friendIds = getfriends.map(friend => friend.friendId)
    let friends
    if (req.query.name !== 'undefined' && req.query.name !== '') {
      let [firstName, lastName] = req.query.name && req.query.name.split(' ')
      lastName = lastName || firstName;
      friends = await User.findAll({
        where: {
          id: { [Op.in]: friendIds },
          [Op.or]: [
            { firstName: { [Op.iLike]: `${firstName}%` } },
            { lastName: { [Op.iLike]: `${lastName}%` } }],
        },
        order: [['firstName', 'ASC']],
      })
    } else {
      friends = await User.findAll({
        where: {
          id: { [Op.in]: friendIds },
        },
        order: [['firstName', 'ASC']]
      })
    }
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
      include: [Product, Category, User],
      order: [['createdAt', 'DESC']],
    })
    res.json(activities)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/leaderboard', async (req, res, next) => {
  try {
    const getfriends = await Friends.findAll({
      where: {
        myId: req.params.userId
      }
    })
    const friendIds = getfriends.map(friend => friend.friendId)
    const leaders = await User.findAll({
      where: {
        id: { [Op.in]: [req.params.userId, ...friendIds] }
      },
      include: [Milestone],
      order: [['totalPoints', 'DESC']]
    })
    res.json(leaders);
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/feed', async (req, res, next) => {
  try {
    const getfriends = await Friends.findAll({
      where: {
        myId: req.params.userId
      }
    })
    const friendIds = getfriends.map(friend => friend.friendId)
    const feed = await Activity.findAll({
      where: {
        userId: { [Op.in]: [req.params.userId, ...friendIds] }
      },
      include: [Product, Category, User],
      order: [['createdAt', 'DESC']]
    })
    res.json(feed);
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
