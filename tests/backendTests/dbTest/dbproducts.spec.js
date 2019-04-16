/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Products = db.model('products')

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('name', () => {
      let product

      beforeEach(async () => {
        cody = await Products.create({
          name: 'TEST NAME',
          price: 4
        })
      })

      it('returns true if the name is correct', () => {
        expect(product.name('TEST NAME')).to.be.equal(true)
      })

      it('returns false if the price is correct', () => {
        expect(product.name(4)).to.be.equal(true)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
})
