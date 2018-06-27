const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Ad = db.define('ad', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Ad.filterByDistance = function(ads, userLocation) {
  return ads.filter(ad => {
    // need to parse out adLocation to get lat/lng
    const adLocation = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${
      ad.address
    }&inputtype=textquery&key=${googleAPIKey}`
    // need to parse out distance to get to a Number data type
    const distance = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${adLocation}&units=imperial&key=${googleAPIKey}`
    return distance <= 10
  })
}

module.exports = Ad
