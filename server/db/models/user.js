const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true
    // allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  PhoneNumber: {
    type: Sequelize.STRING
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  ccNumber: {
    type: Sequelize.STRING.BINARY
    /*  get() {
      return () => this.getDataValue('ccNumber')
    } */
  },
  expDate: {
    type: Sequelize.DATE
  },
  ccvCode: {
    type: Sequelize.INTEGER
  },
  billingAddress: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}
/* User.prototype.correctCCnumber = function(custCCnumber) {
  return User.encryptCC(custCCnumber, this.salt()) === this.ccNumber()
} */

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}
/* User.encryptCC = function(number, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(number)
    .update(salt)
    .digest('hex')
} */

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}
/* const setSaltAndCC = user => {
  if (user.changed('ccNumber')) {
    user.salt = User.generateSalt()
    user.ccNumber = User.encryptCC(user.ccNumber(), user.salt())
  }
} */

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

/* User.beforeCreate(setSaltAndCC)
User.beforeUpdate(setSaltAndCC)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndCC)
}) */
