const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Details = db.define('details', {
  purchaseQuantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.INTEGER, //price in cents
    allowNull: false,
    validate: {
      min: 1,
    }
  }
})

module.exports = Details
