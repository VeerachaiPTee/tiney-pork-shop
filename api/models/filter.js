const { sqlcmd } = require('../config/dbConnect')

class Filter {
  constructor(args) {
    Object.assign(this, args)
  }
  static selectAllProduct() {
    const query = `SELECT * FROM PRODUCT`
    return sqlcmd(query)
  }
}

module.exports = Filter
