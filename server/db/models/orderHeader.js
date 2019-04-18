const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {

  purchasedDate: {
    type: Sequelize.DATE
  },
  shippedDate: {
    type: Sequelize.DATE
  }

})

module.exports = Order
