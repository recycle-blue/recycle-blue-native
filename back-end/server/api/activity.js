const router = require('express').Router()
const { Activity } = require('../db/models')
const cloudinary = require('cloudinary')
const { CLOUDINARY } = require('../../secrets')
const fs = require('fs')
module.exports = router

console.log('in api/activity')

cloudinary.config({
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.KEY,
  api_secret: CLOUDINARY.SECRET,
  secure: true,
})

// router.get('/', async (req, res, next) => {
//   try {
//     const activity = await Activity.findAll({
//       attributes: ['id', 'email']
//     })
//     res.json(activity)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    // const activity = await Activity.create(
    //   {

    //   }
    // )
    res.json()
  } catch (err) {
    next(err)
  }
})

const parseImgTags = (imgTagResults) => {
  console.log('amazon', imgTagResults.aws_rek_tagging.data)
  console.log('google', imgTagResults.google_tagging.data)
  console.log('imagga', imgTagResults.imagga_tagging.data)
}

router.post('/photo', async (req, res, next) => {
  try {
    const cloudData = await cloudinary.v2.uploader.upload(req.body.photo, { categorization: 'google_tagging,imagga_tagging,aws_rek_tagging', auto_tagging: 0.6 })
    console.log('cloud data', cloudData.info.categorization)
    const photoUrl = cloudData.secure_url
    const imgRecognitionResults = cloudData.info.categorization
    parseImgTags(imgRecognitionResults)
    fs.writeFile('/tmp/cloudDataTest', JSON.stringify(cloudData), (err) => {
      if (err) {
        return console.log(err)
      }
      console.log('file saved')
    })
    res.json(cloudData)
  } catch (err) {
    next(err)
  }
})

