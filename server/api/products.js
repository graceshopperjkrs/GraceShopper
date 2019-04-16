const router = require('express').Router()
const {Products} = require('../db')

router.get('/', async (req, res, next){
  try {
    const all = await Products.findAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req,res,next) => {
  try {
    const selected = await Products.findByPk(req.params.id);
    res.json(selected);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
