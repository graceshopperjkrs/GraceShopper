const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Details = db.define('details', {
  purchaseQuantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Details
