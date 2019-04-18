const { expect } = require('chai')
const db = require('../server/db/index.js')
const OrderStatuses = db.model('orderStatuses')
const seed = require('../script/seed')

describe('Order Status model', () => {
  beforeEach(async () => {
    return db.sync({ force: true })
  })

  describe('column definitions and validations', () => {
    it('has a `status` and description` and has 4 rows with draft, purchased, shipped and delivered statuses', async () => {
      await seed()

      const status = await OrderStatuses.findAll()

      expect(status.length).to.equal(4)

      const statusNames = status.map(el => {
        return el.status
      })

      expect(statusNames).to.include('draft')
      expect(statusNames).to.include('purchased')
      expect(statusNames).to.include('shipped')
      expect(statusNames).to.include('delivered')
    })
  })
})
