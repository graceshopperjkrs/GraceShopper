const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//get cart
// Where: find by UserId or OrderId to come in findAll below.

router.get('/', async (req, res, next) => {
  try {
    let orderInfo

    // User is not logged in, is there a session active?
    if (req.user === undefined) {
      orderInfo = await Orders.findOne({
        where: {
          sessionId: req.session.id,
          orderStatusId: 1
        }
      })
    } else {
      orderInfo = await Orders.findOne({
        //user IS logged in, see if there is an existing order
        where: {
          userId: req.user.id,
          orderStatusId: 1
        }
      })
      // (still for logged in user, if there is no existing order, create one)
      if (!orderInfo) {
        orderInfo = await Orders.create({
          userId: req.user.id,
          orderStatusId: 1
        })
      }
      const orderId = orderInfo.id
      const cartDetails = await Orders.findByPk(orderId, {
        include: [
          {
            model: Products,
            through: Details
          }
        ]
      })

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

      console.log(cartInfo)
      res.json(cartInfo)
    }
  } catch (err) {
    next(err)
  }
})

//create cart
router.post('/', async (req, res, next) => {
  // console.log('cart post', req.originalUrl, req.baseUrl)
  try {
    //before we add to table , first check if order id already exists for a user.

    let sessionVal = req.session.id

    if (req.user === undefined) {
      let newOrder = await Orders.create({
        orderStatusId: 1,
        sessionId: sessionVal
      })
      let id = newOrder.id

      let newDetail = await Details.create({
        productId: req.body.productId,
        purchaseQuantity: req.body.qty,
        purchasePrice: req.body.price,
        orderId: id
      })
    } else {
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

      let newDetail = await Details.create({
        productId: req.body.productId,
        purchaseQuantity: req.body.qty,
        purchasePrice: req.body.price,
        orderId: newOrderId
      })

      res.send(newDetail)
    }
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
      }
    })

    if (!existingProduct) {
      res.status(404).json('Product Not Found in Cart')
    } else if (req.body.qty === 0) {
      await Details.destroy({
        where: {
          productId: req.params.productId
        }
      })
      res.sendStatus(204)
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
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})
//this put will update orderstus in cart once payment is made and transaction is complete
router.put('/', async (req, res, next) => {
  try {
    const existingOrder = await Orders.findOne({
      where: {
        id: req.body.orderId
      }
    })

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
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  console.log('cart DELETE route', req.params.productId)
  // THIS STILL NEEDS TO GET THE ORDER ID FROM SESSION
  try {
    await Details.destroy({
      where: {
        // something for session TO IDENTIFY ORDERID
        //orderId: req.session.cookie.orderId,
        productId: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
