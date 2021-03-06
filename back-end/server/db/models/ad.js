const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const axios = require('axios')
const Activity = require('./activity')
const Category = require('./category')
const Product = require('./product')

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

Ad.filterByDistance = async function(userLocation, categoryId, name) {
  let ads = await this.findAll({
    include: [
      {
        model: Activity,
        where: {
          type: 'ad'
        },
        include: [
          {
            model: Category,
            attributes: ['id','name']
          },
          {
            model: Product,
            attributes: ['name']
          }
        ]
      }
    ],
  })

  if(categoryId !== undefined && categoryId!=='') {
    ads = ads.filter( ad => {
      return ad.activity.category.id === Number(categoryId)
    })
  }

  if(name !== undefined) {
    ads = ads.filter( ad => {
      return (ad.activity.category.name.toLowerCase() + ' ' + ad.activity.product.name.toLowerCase()).indexOf(name.toLowerCase().trim()) > -1
    })
  }

  const adAddresses = ads
    .map(ad => `${ad.address.replace(/\s/g, '+')}+${ad.city}+${ad.state}`)
    .join('|')

  const {data} = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${adAddresses}&units=imperial&key=${
      process.env.GOOGLE_API_KEY
    }`
  )
  const distanceArray =  data.rows[0] && data.rows[0].elements || []
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
