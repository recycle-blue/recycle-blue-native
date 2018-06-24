const router = require('express').Router()
const { User, Activity, Product } = require('../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll()
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

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
        userId : req.params.userId
      },
      include: [Product]
    })
    res.json(activities)
  } catch (err) {
    next(err)
  }
})
