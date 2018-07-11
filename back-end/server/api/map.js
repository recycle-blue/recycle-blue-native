const router = require('express').Router()
const axios = require('axios')
module.exports = router

const googleAPIKey = process.env.GOOGLE_API_KEY

// GET Routes
router.get('/recyclelocations', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.location}&keyword=recycle&radius=3000&key=${googleAPIKey}`
    )
    res.json(data.results)
  } catch (err) {
    next(err)
  }
})

router.get('/distance', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.query.origin}&destinations=${req.query.destination}&units=imperial&key=${googleAPIKey}`
    )
    res.json(data)
  } catch (err) {
    next(err)
  }
})
