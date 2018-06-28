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

Ad.filterByDistance = async function(userLocation) {
  const ads = await this.findAll()
  const adAddresses = ads.map(ad => ad.address.replace(/\s/g, '+')).join('|')
  // need to parse out distance to get to a Number data type
  // const distance = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${adAddresses}&units=imperial&key=${googleAPIKey}`
  // return distance <= 10
  return adAddresses
}

module.exports = Ad
