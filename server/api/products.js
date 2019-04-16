const router = require('express').Router()
const {Products} = require('../db/models')
module.exports = router

/* --------------- */
/*     all gets    */
/* --------------- */
// add findbyid here//

router.get('/', async (req, res, next) => {
  console.log('i am coming here')
  try {
    const allProducts = await Products.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})
