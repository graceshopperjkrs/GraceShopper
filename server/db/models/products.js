const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define(product, {
  name: {
    type: Sequelize.STRING
  },
  imageUrl: {
    //url
  },
  description: {

  },
  price: {

  }
})

module.exports = Products;