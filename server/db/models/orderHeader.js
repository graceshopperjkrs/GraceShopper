const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('draft', 'complete')
  },
  createdDate: {
    type: Sequelize.DATE
  },
  total: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Order
