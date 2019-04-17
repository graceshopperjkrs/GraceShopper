/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../server/db/index.js')
const Products = db.model('products')

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `name`, `imageUrl`, `description`, `price`', async ()=> {
        const product = await Products.create({
          name: 'testproduct',
          price: 10.00
        })
      
        expect(product.name).to.equal('testproduct')
        expect(Number(product.price)).to.equal(10.00)
     
        expect(product.dataValues).to.have.all.keys('id', 
        'name','imageUrl','description','price','createdAt','updatedAt');
        
    })

    it ('`name` and `price` is required', () => {
      const product = Products.build()
      return product.validate() // not atually testing specifically
        .then(
          () => {
            throw new Error ('Validation should fail if no name')
          },
          (err)=> {
            expect(err).to.be.an('error')
          }
        )
    })


  })

 
})


/* xdescribe('instanceMethods', () => {
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
  }) // end describe('instanceMethods') */
