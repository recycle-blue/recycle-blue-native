const router = require('express').Router()
const { Activity } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const activity = await Activity.findAll({
      attributes: ['id', 'email']
    })
    res.json(activity)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const activity = await Activity.findAll({
      attributes: ['id', 'email']
    })
    res.json(activity)
  } catch (err) {
    next(err)
  }
})

router.post('/photo', async (req, res, next) => {
  try {
    cloudinary.v2.uploader.upload()
    const photoUrl = await
      res.json(activity)
  } catch (err) {
    next(err)
  }
})

