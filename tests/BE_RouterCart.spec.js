//placeholder for all route products test specs

const CartRoute = require('../server/api/cart.js')
const {expect} = require('chai')
const request = require('supertest')
const db = require('../server/db')
const app = require('../server/index.js')
const agent = request.agent(app)
const DetailsModel = db.model('details')
const OrderModel = db.model('order')
const seed = require('../script/seed')

describe('Cart Routes /api/cart', () => {
  beforeEach(async () => {
    await seed()
  })

  describe('Gets all cart itmes: GET /api/cart', () => {
    it('gets all cart items details', async () => {
      const res = await agent.get('/api/cart').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).not.equal(null)
      //expect((res.body[0].name).length).not.equal(0)
    })
  })

  describe('Gets single product:  GET /api/products/1', () => {
    it('gets one and only one result and has non-null name', async () => {
      const res = await agent.get('/api/products/1').expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).not.equal(null)
    })
  })

  //describe('PUT ....)

  //describe('POST')

  // describe("DELETE")
})

/* global describe beforeEach it */
