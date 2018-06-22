const db = require('../db')
const Sequelize = require('sequelize')

const Activity = db.define('activity', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true
  // },
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
  }
})
module.exports = Activity
