const router = require('express').Router()
const { Activity, Product, Category, User } = require('../db/models')
const cloudinary = require('cloudinary')
const { CLOUDINARY } = require('../../secrets')
const { parseImgTags } = require('./parseAI')
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
const sendPhotoToCloud = async (photo) => {
  const cloudData = await cloudinary.v2.uploader.upload(
    photo,
    {
      categorization: 'google_tagging,imagga_tagging,aws_rek_tagging',
      auto_tagging: 0.5
    }
  )
  const imageUrl = cloudData.secure_url
  const imgRecognitionResults = cloudData.info.categorization
  const parsedTags = await parseImgTags(imgRecognitionResults)
  console.log('parsed tags', parsedTags)
  return {
    product: parsedTags.product,
    categoryList: parsedTags.categories,
    tags: parsedTags.tags,
    imageUrl
  }
}

router.post('/photo', async (req, res, next) => {
  try {
    const parsedCloudData = await sendPhotoToCloud(req.body.photo)
    res.json(parsedCloudData)
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
    const activityPoints = category.multiplier * product.points
    const newTotalPoints = activityPoints + user.totalPoints
    User.update({ points: newTotalPoints }, { where: { id: user.id } })
    const newActivityData = await Activity.create({
      userId: req.body.userId,
      productId: product.id,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
    })
    const newActivity = newActivityData.dataValues
    newActivity.points = activityPoints
    res.json(newActivity)
  } catch (err) {
    next(err)
  }
})
