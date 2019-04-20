const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')

//get cart
// Where: find by UserId or OrderId to come in findAll below.
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
  console.log('cart post', req.originalUrl, req.baseUrl)
  try {
    const userId = req.session.userId
    const user = await User.findByPk(userId)

    let newOrder = await Orders.create({
      userId: req.session.userId,
      orderStatusId: 1
    })

    const newOrderId = newOrder.id

    let newDetail = await Details.create({
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
  console.log('cart PUT route', req.body, res.session)
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
      res.status(204).send(/*Updated*/)
    //let editedRes = await Details.findAll({where: })
    

  }
})



module.exports = router
