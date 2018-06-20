const {expect} = require('chai')
const {Product} = require('./index')

describe('Product model', () => {
  let plasticBottle = {
    name: 'cool bottle',
    description: 'Do not let whales eat this',
    points: 10,
    recycleUse: 'Put it in the recycling bin'
  }
  it('creates a product with the proper fields', () => {
    return Product.create(plasticBottle).then(newProduct => {
      expect(newProduct).to.be.an('object')
      expect(newProduct.name).to.equal('cool bottle')
      expect(newProduct.description).to.equal('Do not let whales eat this')
      expect(newProduct.points).to.equal(10)
      expect(newProduct.recycleUse).to.equal('Put it in the recycling bin')
    })
  })
})
