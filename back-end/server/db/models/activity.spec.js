const {expect} = require('chai')
const {Product, User, Activity} = require('./index')
// const db = require('../db')

describe('Activity model', () => {
  const plasticBottle = {
    name: 'cool bottle',
    description: 'Do not let whales eat this',
    points: 10,
    recycleUse: 'Put it in the recycling bin'
  }
  const bob = {
    firstName: 'Bob',
    lastName: 'McDowell',
    email: 'bob@gmail.com'
  }
  let someProduct, someUser
  beforeEach(async () => {
    const promises = await Promise.all([
      Product.create(plasticBottle),
      User.create(bob)
    ])
    ;[someProduct, someUser] = promises
  })
  it('join table is populated with correct values', async () => {
    const newActivity = await Activity.create({
      quantity: 2,
      productId: someProduct.id,
      userId: someUser.id,
      likes: 1
    })
    expect(newActivity).to.be.an('object')
    expect(newActivity.userId).to.equal(someUser.id)
    expect(newActivity.productId).to.equal(someProduct.id)
    expect(newActivity.quantity).to.equal(2)
    expect(newActivity.likes).to.equal(1)
  })
  it('validates notNull constraints', async () => {
    try {
      await Activity.create({
        likes: 1
      })
    } catch (err) {
      expect(err.message).to.contain('notNull')
    }
    try {
      await Activity.create({
        quantity: 10
      })
    } catch (err) {
      expect(err.message).to.contain('notNull')
    }
  })
  it('contains an id primary key that auto increments', async () => {
    const activity1 = await Activity.create({quantity: 1, likes: 2})
    const activity2 = await Activity.create({quantity: 1, likes: 2})

    expect(activity1.id).to.be.lessThan(activity2.id)
  })
})
