const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')



const Details = db.define(details, {
  purchaseQuantity: {

  },
  purchasePrice: {
    //at time of purchase 
  }
})

module.exports = Details