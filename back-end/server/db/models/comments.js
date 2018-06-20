const db = require('../db')
const Sequelize = require('sequelize')

const Comments = db.define('comment', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Comments
