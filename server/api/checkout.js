const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.put('/checkout', (req, res, next) => {
  console.log(req.body)
})
