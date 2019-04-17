const db = require('../db')
const Sequelize = require('sequelize')

const OrderStatus = db.define('orderStatus', {
  status: {
    type: Sequelize.STRING
  },
  description: {
      type: Sequelize.STRING
  }
})

module.exports = OrderStatus
