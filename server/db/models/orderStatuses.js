const db = require('../db')
const Sequelize = require('sequelize')

const OrderStatuses = db.define('orderStatuses', {
  status: {
    type: Sequelize.STRING
  },
  description: {
      type: Sequelize.STRING
  }
})

module.exports = OrderStatuses
