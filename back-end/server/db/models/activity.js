const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Activity = db.define('activity', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  unit: {
    type: Sequelize.STRING,
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
    defaultValue: 1
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

Activity.activityCountWeek = function (userId) {
  return (this.findAndCountAll({
    where: {
      userId: userId,
      createdAt: { [Op.gte]: Date.now() - (7 * 86400000) }
    }
  }))
}
module.exports = Activity
