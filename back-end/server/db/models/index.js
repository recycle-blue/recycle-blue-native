const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Comments = require('./comments')
const Tag = require('./tag')
const Milestone = require('./milestone')
const Activity = require('./activity')

Comments.belongsTo(User)
User.hasMany(Comments)

User.belongsToMany(Product, {through: Activity})
Product.belongsToMany(User, {through: Activity})

Comments.belongsTo(Activity)
Activity.hasMany(Comments)

Tag.belongsTo(Product)
Product.hasMany(Tag)

Product.belongsTo(Category)
Category.hasMany(Product)

User.belongsToMany(User, {
  as: 'Friends',
  foreignKey: 'myId',
  through: 'friends',
  otherKey: 'friendId'
})

module.exports = {
  User,
  Category,
  Product,
  Comments,
  Tag,
  Milestone,
  Activity
}
