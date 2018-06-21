const db = require('./server/db')
const {expect} = require('chai')

before(() => {
  return db.sync({force: true})
})

afterEach(() => {
  return db.sync({force: true})
})
