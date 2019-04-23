const router = require('express').Router()
const stripe = require('stripe')('sk_test_0eInzLw8GO8ZLYB3mvEWqsJW00B6pYnz5m')

router.post('/charge', async (req, res) => {
  try {
    console.log(req.body)
    let {status} = await stripe.charges.create({
      amount: req.body.price,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })
    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})

module.exports = router
