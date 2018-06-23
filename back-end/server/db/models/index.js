const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Comments = require('./comments')
const Tag = require('./tag')
const Milestone = require('./milestone')
const Activity = require('./activity')

User.belongsTo(Milestone)
Milestone.hasMany(User)

Activity.belongsTo(User)
User.hasMany(Activity)

Activity.belongsTo(Product)
Product.hasMany(Activity)

Comments.belongsTo(Activity);
Activity.hasMany(Comments);

Comments.belongsTo(User);
User.hasMany(Comments);

Tag.belongsTo(Product)
Product.hasMany(Tag)

Tag.belongsTo(Category)
Category.hasMany(Tag)

Product.belongsTo(Category)
Category.hasMany(Product)

User.belongsTo(Milestone)
Milestone.hasMany(User)

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
