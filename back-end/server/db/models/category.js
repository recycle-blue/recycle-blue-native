const db = require('../db')
const Sequelize = require('sequelize')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  multiplier: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Category
