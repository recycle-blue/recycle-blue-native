const router = require('express').Router()
const { Activity } = require('../db/models')
const cloudinary = require('cloudinary')
const { CLOUDINARY } = require('../../secrets')
module.exports = router

cloudinary.config({
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.KEY,
  api_secret: CLOUDINARY.SECRET,
  secure: true,
})

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
    const cloudData = await cloudinary.v2.uploader.upload(req.photo, { categorization: ['google_tagging', 'imagga_tagging', 'aws_rek_tagging'] })
    console.log(cloudData)
    const photoUrl = cloudData.secure_url
    // const imgRecognitionResults = await
    res.json(cloudData)
  } catch (err) {
    next(err)
  }
})

