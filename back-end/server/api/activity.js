const router = require('express').Router()
const {
  Activity,
  Product,
  Category,
  User,
  Ad,
  Comments
} = require('../db/models')
const cloudinary = require('cloudinary')
const {parseImgTags} = require('./parseAI')
module.exports = router

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
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

// GET Routes
router.get('/weekly/:userId', async (req, res, next) => {
  try {
    const response = await Activity.activityCountWeek(req.params.userId)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:activityId/ad', async (req, res, next) => {
  try {
    const ad = await Ad.find({
      where: {
        activityId: +req.params.activityId
      }
    })
    res.json(ad)
  } catch (err) {
    next(err)
  }
})

router.get('/:activityId/comments', async (req, res, next) => {
  try {
    const comments = await Activity.findById(req.params.activityId, {
      include: [{model: Comments, include: [User]}]
    })
    res.json(comments)
  } catch (err) {
    next(err)
  }
})

// POST Routes
const sendPhotoToCloud = async photo => {
  const cloudData = await cloudinary.v2.uploader.upload(photo, {
    categorization: 'google_tagging,imagga_tagging,aws_rek_tagging',
    auto_tagging: 0.5
  })
  const imageUrl = cloudData.secure_url
  const imgRecognitionResults = cloudData.info.categorization
  const parsedTags = await parseImgTags(imgRecognitionResults)
  return {
    product: parsedTags.product,
    category: parsedTags.category,
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
    const categoryData = await Category.find({where: {name: req.body.category}})
    const productData = await Product.find({where: {name: req.body.name}})
    const userData = await User.findById(req.body.userId)
    const category = categoryData.dataValues
    let product
    if (productData) {
      product = productData.dataValues
    } else {
      product = {
        id: 1,
        name: 'Unknown',
        imageUrl:
          'https://5.imimg.com/data5/SD/JK/MY-10914613/plastic-water-bottle-500x500.jpg',
        points: 0,
        description: 'Product not found.',
        recycleUse: 'Product not found.'
      }
    }
    const user = userData.dataValues
    const activityPoints = category.multiplier * product.points
    const newTotalPoints = activityPoints + user.totalPoints
    User.update({totalPoints: newTotalPoints}, {where: {id: user.id}})
    const newActivityData = await Activity.create({
      userId: req.body.userId,
      productId: product.id,
      categoryId: category.id,
      quantity: Number(req.body.quantity),
      imageUrl: req.body.imageUrl,
      type: req.body.type,
      unit: req.body.unit
    })
    const activity = newActivityData.dataValues
    activity.points = activityPoints
    const resData = {activity, category, product}
    res.json(resData)
  } catch (err) {
    next(err)
  }
})

router.post('/ad', async (req, res, next) => {
  try {
    const newAdRes = await Ad.create(
      {
        activityId: req.body.activityId,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description
      },
      {individualHooks: true}
    )
    const newAd = newAdRes.dataValues
    res.json(newAd)
  } catch (err) {
    next(err)
  }
})

router.post('/:activityId/comment', async (req, res, next) => {
  try {
    const newCommentRes = await Comments.create({
      userId: req.body.userId,
      activityId: req.body.activityId,
      text: req.body.text
    })
    const newComment = newCommentRes.dataValues
    res.json(newComment)
  } catch (err) {
    next(err)
  }
})

// get all ads and filter by location
router.get('/marketplace', async (req, res, next) => {
  // const userLocation = req.query.userLocation
  const filteredAds = await Ad.filterByDistance('41.895495,-87.639014')
  res.json(filteredAds)
})
