const db = require('../db')
const Sequelize = require('sequelize')

const Milestone = db.define('milestone', {
  pointsNeeded: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  badgeIcon: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Milestone
