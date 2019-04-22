const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')

//get cart
// Where: find by UserId or OrderId to come in findAll below.
router.get('/', async (req, res, next) => {
  console.log('this is req.user.id', req.user.id)
  try {
    const orderInfo = await Orders.findOne({
      where: {
        userId: req.user.id
      }
    })
    const orderId = orderInfo.id
    // const orderId = orderInfo
    console.log(orderId)
    const cartDetails = await Details.findAll({
      where: {
        orderId: orderId
      }
    })
    console.log(cartDetails)
    res.json(cartDetails)
  } catch (err) {
    next(err)
  }
})

//create cart
router.post('/', async (req, res, next) => {
  console.log('cart post', req.originalUrl, req.baseUrl)
  try {
    //before we add to table , first check if order id already exists for a user.
    //if order id exists then use that else create a new orderid.

    let newOrder = await Orders.create({
      userId: req.user.id,
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
  try {
    const existingProduct = await Details.findAll({
      where: {
        productId: req.params.productId
        //orderId: req.session.cookie.orderId,
      }
    })

    if (!existingProduct) {
      res.status(404).json('Product Not Found in Cart')
    } else {
      await Details.update(
        {purchaseQuantity: req.body.purchaseQuantity},
        {
          where: {
            //orderId: req.session.cookie.orderId,
            productId: req.params.productId
          },
          returning: true
        }
      )
      res.status(204).send(/*Updated*/)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  //console.log('cart DELETE route', req.session.cookie )
  // THIS STILL NEEDS TO GET THE ORDER ID FROM SESSION
  try {
    await Details.destroy({
      where: {
        // something for session TO IDENTIFY ORDERID
        //orderId: req.session.cookie.orderId,
        productId: req.params.productId
      }
    })
    res.status(204).send(/*Deleted*/)
  } catch (err) {
    next(err)
  }
})

module.exports = router
