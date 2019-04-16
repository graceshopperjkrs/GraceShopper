const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const  Order = db.define(product, {
  userId: {

  },
  status: {
    //enum 
  },
  createdDate: {
    // NOW 
  },
  total: {
    //maybe ? 
  },
})

module.exports = Order;