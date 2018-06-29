const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const googleAPIKey = require('../../../secrets')
const axios = require('axios')

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
  const adAddresses = ads
    .map(ad => `${ad.address.replace(/\s/g, '+')}+${ad.city}+${ad.state}`)
    .join('|')

  const {data} = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${adAddresses}&units=imperial&key=${googleAPIKey}`
  )
  const distanceArray = data.rows[0].elements
  const filteredAds = distanceArray.reduce((newArray, distanceData, i) => {
    const distanceInKm = distanceData.distance.value / 1000
    const distanceInMiles = distanceInKm * 0.62137119
    if (distanceInMiles < 0.15) {
      return [...newArray, {ad: ads[i], distance: distanceInMiles}]
    }
    return newArray
  }, [])
  return filteredAds
}

module.exports = Ad
