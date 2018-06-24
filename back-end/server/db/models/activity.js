const db = require('../db')
const Sequelize = require('sequelize')

const Activity = db.define('activity', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})
module.exports = Activity
