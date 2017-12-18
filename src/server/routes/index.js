const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Test page, please ignore')
})

module.exports = router
