const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const axios = require('axios')
const Activity = require('./activity')

if (!process.env.GOOGLE_API_KEY) require('../../../secrets')

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
  },
  latitude: {
    type: Sequelize.STRING
  },
  longitude: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.getDataValue('latitude')},${this.getDataValue(
        'longitude'
      )}`
    }
  }
})

Ad.filterByDistance = async function(userLocation) {
  const ads = await this.findAll({include: [Activity]})
  const adAddresses = ads
    .map(ad => `${ad.address.replace(/\s/g, '+')}+${ad.city}+${ad.state}`)
    .join('|')

  const {data} = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${adAddresses}&units=imperial&key=${
      process.env.GOOGLE_API_KEY
    }`
  )
  const distanceArray = data.rows[0].elements
  const filteredAds = distanceArray.reduce((newArray, distanceData, i) => {
    const distanceInKm = distanceData.distance.value / 1000
    const distanceInMiles = distanceInKm * 0.62137119
    if (distanceInMiles < 5) {
      return [...newArray, {ad: ads[i], distance: distanceInMiles}]
    }
    return newArray
  }, [])
  return filteredAds
}

Ad.afterCreate(async ad => {
  const address = `${ad.address.replace(/\s/g, '+')}+${ad.city}+${ad.state}`
  const {data} = await axios.get(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=${address}&fields=geometry&key=${
      process.env.GOOGLE_API_KEY
    }`
  )
  const latitude = data.candidates[0].geometry.location.lat
  const longitude = data.candidates[0].geometry.location.lng

  await Ad.update(
    {
      latitude,
      longitude
    },
    {
      where: {
        id: ad.id
      }
    }
  )
})

module.exports = Ad
