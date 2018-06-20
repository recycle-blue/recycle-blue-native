const db = require('../db')
const Sequelize = require('sequelize')

const Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Tag
