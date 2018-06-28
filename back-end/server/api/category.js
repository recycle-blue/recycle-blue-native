const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router


router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll()
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })
