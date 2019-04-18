const User = require('./user')
const Products = require('./products')
const Orders = require('./orderHeader')
const Details = require('./orderDetails')
const OrderStatuses = require('./orderStatuses')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Orders)
Orders.belongsTo(User)

//Details.hasMany(Products)
Orders.belongsToMany(Products, {through: Details})
//Details.belongsTo(Orders)
//Details.belongsTo(Products)
Orders.belongsTo(OrderStatuses)

module.exports = {
  User,
  Products,
  Orders,
  OrderStatuses,
  Details
}
