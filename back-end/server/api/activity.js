const router = require('express').Router()
const { Activity, Product, Category, User } = require('../db/models')
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

const parseImgTags = (imgTagResults) => {
  console.log('amazon', imgTagResults.aws_rek_tagging.data)
  console.log('google', imgTagResults.google_tagging.data)
  console.log('imagga', imgTagResults.imagga_tagging.data)
  fs.writeFile('/tmp/cloudDataTest', JSON.stringify(cloudData), (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('file saved')
  })
  return {
    name: 'bottle',
    category: 'Plastic',
  }
}

const sendPhotoToCloud = async (photo) => {
  const cloudData = await cloudinary.v2.uploader.upload(
    photo,
    {
      categorization: 'google_tagging,imagga_tagging,aws_rek_tagging',
      auto_tagging: 0.6
    }
  )
  console.log('cloud data', cloudData.info.categorization)
  const imageUrl = cloudData.secure_url
  const imgRecognitionResults = cloudData.info.categorization
  const parsedTags = parseImgTags(imgRecognitionResults)
  return {
    name: parsedTags.name,
    category: parsedTags.category,
    imageUrl
  }
}

router.post('/photo', async (req, res, next) => {
  try {
    const cloudData = await sendPhotoToCloud(req.body.photo)
    res.json(cloudData)
  } catch (err) {
    next(err)
  }
})



router.post('/', async (req, res, next) => {
  try {
    const categoryData = await Category.find({ where: { name: req.body.category } })
    const productData = await Product.find({ where: { name: req.body.name } })
    const userData = await User.findById(req.body.userId)
    const category = categoryData.dataValues
    const product = productData.dataValues
    const user = userData.dataValues
    console.log('user return from db', user)
    console.log('product return from db', product)
    console.log('category return from db', category)
    const activityPoints = category.multiplier * product.points
    const newTotalPoints = activityPoints + user.totalPoints
    // user.update({ points: newTotalPoints })
    console.log('new total points', newTotalPoints)
    const newActivity = await Activity.create({
      userId: req.body.userId,
      productId: product.id,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
    })
    newActivity.points = activityPoints
    res.json(newActivity)
  } catch (err) {
    next(err)
  }
})
