const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//get cart
// Where: find by UserId or OrderId to come in findAll below.

router.get('/', async (req, res, next) => {
  // console.log('this is req.user.id', req.user.id)
  try {
    let orderInfo = await Orders.findOne({
      where: {
        userId: req.user.id,
        orderStatusId: 1
      }
    })
    if (!orderInfo) {
      orderInfo = await Orders.create({
        userId: req.user.id,
        orderStatusId: 1
      })
    }
    const orderId = orderInfo.id
    // const orderId = orderInfo
    // console.log(orderId)
    // console.log(' i am going to check order table now......')
    const cartDetails = await Orders.findByPk(orderId, {
      include: [
        {
          model: Products,
          through: Details //['purchaseQuantity']
        }
      ]
    })
    console.log('this is cart.products', cartDetails)
    console.log(
      'this is cartdetails.products2',
      cartDetails.dataValues.products
    )
    const cartInfo = cartDetails.dataValues.products.map(ele => {
      const dv = ele.dataValues
      return {
        orderId: orderId,
        productId: dv.id,
        name: dv.name,
        imageUrl: dv.imageUrl,
        description: dv.description,
        qty: dv.details.purchaseQuantity,
        price: dv.price
      }
    })
    /* console.log(
      'this is cartdetails.products.details',
      cartDetails[0].dataValues.products[0].dataValues.details
    ) */
    console.log(cartInfo)
    res.json(cartInfo)
  } catch (err) {
    next(err)
  }
})

//create cart
router.post('/', async (req, res, next) => {
  // console.log('cart post', req.originalUrl, req.baseUrl)
  try {
    //before we add to table , first check if order id already exists for a user.
    //if order id exists then use that else create a new orderid

    let orderInfo = await Orders.findOrCreate({
      where: {
        userId: req.user.id,
        orderStatusId: 1
      },
      defaults: {
        userId: req.user.id,
        orderStatusId: 1
      }
    })

    let newOrderId = orderInfo[0].dataValues.id

    console.log('this is orderInfo', newOrderId)
    let newDetail = await Details.create({
      productId: req.body.productId,
      purchaseQuantity: req.body.qty,
      purchasePrice: req.body.price,
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
        {purchaseQuantity: req.body.qty},
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

router.put('/', async (req, res, next) => {
  try {
    console.log('EXISTING:!!', req.body.orderId)
    const existingOrder = await Orders.findOne({
      where: {
        id: req.body.orderId
      }
    })
    console.log('EXISTINGOrder:!!', existingOrder)

    if (existingOrder) {
      await Orders.update(
        {orderStatusId: 2},
        {
          where: {
            id: req.body.orderId
          },
          returning: true
        }
      )
      res.status(204).send()
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
