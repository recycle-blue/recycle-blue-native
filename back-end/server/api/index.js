const router = require('express').Router()
module.exports = router



router.use('/users', require('./users'))
router.use('/activity', require('./activity'))
router.use('/product', require('./product'))
router.use('/category', require('./category'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// function isCorrectUser(req, res, next) {
//   if (req.user && req.user.id === req.params.userId) {
//     next()
//   } else {
//     res.status(401).send('Unauthorized')
//   }
// }
