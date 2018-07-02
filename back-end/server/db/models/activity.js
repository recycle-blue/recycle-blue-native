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
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

Activity.activityCountWeek = async function (userId) {
  console.log("in model", userId, typeof userId)
  console.log("what is date .now", Date.now())
  const a = await this.findAndCountAll({
    where: {
      userId: userId,
      createdAt: { [Op.gte]: Date.now() - (7 * 86400000) }
    }
  })
  console.log("in model", a)
  return a
}
module.exports = Activity
