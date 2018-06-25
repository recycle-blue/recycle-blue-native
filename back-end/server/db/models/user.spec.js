/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {User} = require('./index')
// const Friends = db.model('friends')

describe('User model', () => {
  let cody, mario
  beforeEach(async () => {
    cody = await User.create({
      firstName: 'Cody',
      lastName: 'Jones',
      email: 'cody@puppybook.com',
      password: 'bones'
    })
    mario = await User.create({
      firstName: 'Mario',
      lastName: 'The Plumber',
      email: 'mario@nintendo.com',
      password: 'weeee'
    })
  })
  it('creates a user with correct fields', () => {
    expect(cody).to.be.an('object')
    expect(cody.firstName).to.equal('Cody')
    expect(cody.lastName).to.equal('Jones')
    expect(cody.email).to.equal('cody@puppybook.com')
  })
  xit('creates friends', async () => {
    await cody.setFriends([mario])
    await mario.setFriends([cody])
    const friends = await Friends.findAll()
    expect(friends.length).to.equal(2)
    expect(friends[0].myId).to.equal(cody.id)
    expect(friends[0].friendId).to.equal(mario.id)
    expect(friends[1].myId).to.equal(mario.id)
    expect(friends[1].friendId).to.equal(cody.id)
  })
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Puppy',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
