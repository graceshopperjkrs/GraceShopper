const router = require('express').Router()
const {Products} = require('../db/models')
module.exports = router

/* --------------- */
/*     all gets    */
/* --------------- */
// add findbyid here//

router.get('/:id', async (req, res, next) => {
  try {
    console.log('sproute', req.baseUrl, req.originalUrl)
    const selected = await Products.findByPk(req.params.id)
    res.json(selected)
  } catch (error) {
    next(error)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
