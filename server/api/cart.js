const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')

//get cart

//create cart
router.post('/', async (req, res, next) => {
  try {
    const userId = req.session.userId
    const user = await User.findByPk(userId)

    let newOrder = await Orders.create({
      userId: req.session.userId,
      orderStatusId: 1
    })

    const newOrderId = newOrder.id

    let newDetail = Details.create({
      productId: req.body.productId,
      purchaseQuantity: req.body.purchaseQuantity,
      purchasePrice: req.body.purchasePrice,
      orderId: newOrderId
    })

    res.send(newDetail)
  } catch (err) {
    next(err)
  }
})

//delete cart

//update

module.exports = router
