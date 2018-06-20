const db = require('../db')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://5.imimg.com/data5/SD/JK/MY-10914613/plastic-water-bottle-500x500.jpg'
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  recycleUse: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
