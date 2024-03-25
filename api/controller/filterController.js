const Filter = require('../models/filter')

const handleAllProduct = async (req, res, next) => {
  try {
    const result = await Filter.selectAllProduct()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  handleAllProduct,
}
