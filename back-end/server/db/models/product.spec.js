const {expect} = require('chai')
const {Product} = require('./index')

describe('Product model', () => {
  let plasticBottle = {
    name: 'cool bottle',
    description: 'Do not let whales eat this',
    points: 10,
    recycleUse: 'Put it in the recycling bin'
  }
  let nullName = {
    description: 'something',
    points: 11,
    recycleUse: "I don't know"
  }
  let emptyName = {
    name: '',
    points: 11,
    recycleUse: 'Whatever'
  }
  it('creates a product with the proper fields', async () => {
    const newProduct = await Product.create(plasticBottle)
    expect(newProduct).to.be.an('object')
    expect(newProduct.name).to.equal('cool bottle')
    expect(newProduct.description).to.equal('Do not let whales eat this')
    expect(newProduct.points).to.equal(10)
    expect(newProduct.recycleUse).to.equal('Put it in the recycling bin')
  })
  it('properly validates null', async () => {
    try {
      await Product.create(nullName)
    } catch (err) {
      expect(err.message).to.contain('notNull')
    }
  })
  it('properly validates empty', async () => {
    try {
      await Product.create(emptyName)
    } catch (err) {
      expect(err.message).to.contain('Validation')
    }
  })
})
