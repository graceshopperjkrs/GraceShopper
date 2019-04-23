const router = require('express').Router()
const {Products, Orders, Details, OrderStatuses, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//get cart
// Where: find by UserId or OrderId to come in findAll below.

router.get('/', async (req, res, next) => {

  try {
    let orderInfo
    if (req.user === undefined) {
      orderInfo = await Orders.findOne({
        where: {
          sessionId: req.session.id
        }
      })
    } else {
      orderInfo = await Orders.findOne({
        where: {
          userId: req.user.id
        }
      })
    }
    const orderId = orderInfo.id
    // const orderId = orderInfo
    console.log('get route:  orderId', orderId)
    // console.log(' i am going to check order table now......')
    const cartDetails = await Orders.findByPk(orderId, {
      include: [
        {
          model: Products,
          through: Details //['purchaseQuantity']
        }
      ]
    })
    // console.log('this is cart.products', cartDetails)
    // console.log(
    //   'this is cartdetails.products2',
    //   cartDetails.dataValues.products
    // )
    const cartInfo = cartDetails.dataValues.products.map(ele => {
      const dv = ele.dataValues
      return {
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
    //if order id exists then use that else create a new orderid.



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


      res.send(newDetail) //what to send
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
        productId: req.params.productId,
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
