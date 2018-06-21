const {expect} = require('chai')
const {User, Milestone} = require('./index')
const db = require('../index')
const UserMilestone = db.model('user_milestone')

describe('Milestone model', () => {
  const bob = {
    firstName: 'Bob',
    lastName: 'McDowell',
    email: 'bob@gmail.com'
  }
  const coolMilestone = {
    pointsNeeded: 50,
    description: 'The best milestone ever!',
    badgeIcon: 'Something cool'
  }
  let someUser, someMilestone
  beforeEach(async () => {
    const promises = await Promise.all([
      User.create(bob),
      Milestone.create(coolMilestone)
    ])
    ;[someUser, someMilestone] = promises
  })
  it('populates the join table correctly', async () => {
    await someMilestone.setUsers([someUser])
    const milestoneUserRows = await UserMilestone.findAll()
    expect(milestoneUserRows.length).to.equal(1)
    expect(milestoneUserRows[0].userId).to.equal(someUser.id)
    expect(milestoneUserRows[0].milestoneId).to.equal(someMilestone.id)
  })
})
