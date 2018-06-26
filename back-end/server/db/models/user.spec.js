/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {User} = require('./index')
const Followees = db.model('followees')

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
  it('allows user to followe another user', async () => {
    await cody.addFollowee(mario)
    const allFollowees = await Followees.findAll()
    expect(allFollowees.length).to.equal(1)
    expect(allFollowees[0].followerId).to.equal(cody.id)
    expect(allFollowees[0].followeeId).to.equal(mario.id)
  })
  xdescribe('instanceMethods', () => {
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
