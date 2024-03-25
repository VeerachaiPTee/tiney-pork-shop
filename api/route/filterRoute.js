const express = require('express')
const router = express.Router()
const { handleDeleteData } = require('../controller/productController')
const { handleAllProduct } = require('../controller/filterController')

router.get('/listProduct', handleAllProduct)
router.post('/deleteProduct', handleDeleteData)

module.exports = router
