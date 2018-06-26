const router = require('express').Router()
const { Activity, Product, Category, User, Ad } = require('../db/models')
const cloudinary = require('cloudinary')
const { parseImgTags } = require('./parseAI')
module.exports = router

console.log('in api/activity')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
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

// GET Routes
router.get("/weekly/:userId", async (req, res, next) => {
  try {
    const response = await Activity.activityCountWeek(req.params.userId)
    res.json(response)
  } catch (err) {
    next(err)
  }

})


// POST Routes
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
    User.update({ totalPoints: newTotalPoints }, { where: { id: user.id } })
    const newActivityData = await Activity.create({
      userId: req.body.userId,
      productId: product.id,
      categoryId: category.id,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
      type: req.body.type,
      unit: req.body.unit
    })
    const newActivity = newActivityData.dataValues
    newActivity.points = activityPoints
    res.json(newActivity)
  } catch (err) {
    next(err)
  }
})

router.post('/ad', async (req, res, next) => {
  try {
    const newAdRes = await Ad.create({
      activityId: req.body.activityId,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      email: req.body.email,
      phone: req.body.phone,
      description: req.body.description,
    })
    const newAd = newAdRes.dataValues
    res.json(newAd)
  } catch (err) {
    next(err)
  }
})
