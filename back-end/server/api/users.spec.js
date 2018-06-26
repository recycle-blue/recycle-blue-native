/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Followees = db.model('followees')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    let cody, dustin
    beforeEach(async () => {
      cody = await User.create({
        firstName: 'Cody',
        lastName: 'Jones',
        email: codysEmail,
        password: '1234'
      })
      dustin = await User.create({
        firstName: 'Dustin',
        lastName: 'McDowell',
        email: 'dustin@email.com',
        password: 'password'
      })
    })
    it('lets user follow other user', async () => {
      // login a user and hit post route to add as a follower
    })

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
