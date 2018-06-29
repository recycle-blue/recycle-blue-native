const router = require('express').Router()
module.exports = router

router.use('*', (req, res, next) => {
  try {
    console.log("what is req.session", req.session)
    res.json(202)
  } catch (err) {
    console.log("fdssfdsdsfdsfdsfdhdkjhfskjdhfwehoiudnflkjsd;ih pihdsfihd lif pfisihdsfhsadif")
    next(err)
  }
})