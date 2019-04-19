const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')

//get cart

router.get('/', async (req, res, next) => {
  try {
    const allCartItems = await Details.findAll()
    res.json(allCartItems)
  } catch (err) {
    next(err)
  }
})

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

    res.send(newDetail) //what to send
  } catch (err) {
    next(err)
  }
})

//update

router.put('/:productId', async (req, res, next) => {
  const existingProduct = await Details.findByPk(req.params.productId)

  if (!existingProduct) {
    res.status(404).json('Product Not Found in Cart')
  } else {
    await Details.update(
      {purchaseQuantity: req.body.purchaseQuantity},
      {
        where: {
          productId: req.params.productId
        },
        returning: true
      }
    )
  }
})

module.exports = router
