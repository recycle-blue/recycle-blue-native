const {expect} = require('chai')
const {User, Milestone} = require('./index')

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
  it('properly creates a milestone', () => {
    expect(someMilestone).to.be.an('object')
    expect(someMilestone.pointsNeeded).to.equal(50)
    expect(someMilestone.description).to.equal('The best milestone ever!')
    expect(someMilestone.badgeIcon).to.equal('Something cool')
  })
  it('is set as a foreign key for a user', async () => {
    await someUser.setMilestone(someMilestone)
    expect(someUser.milestoneId).to.equal(someMilestone.id)
  })
})
