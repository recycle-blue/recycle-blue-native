const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Comments = require('./comments')
const Tag = require('./tag')
const Milestone = require('./milestone')
const Activity = require('./activity')

User.belongsTo(Milestone);
Milestone.hasMany(User);

User.belongsToMany(Product, {through: Activity})
Product.belongsToMany(User, {through: Activity})

User.belongsToMany(Activity,
{
    as: 'Comments',
    through: Comments
});

Tag.belongsTo(Product)
Product.hasMany(Tag)

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
