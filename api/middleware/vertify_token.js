const jwt = require('jsonwebtoken')

const Autenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) return res.sendStatus(403)
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    req.ROLE = decoded
    console.log(req.ROLE);
    next()
  })
}
module.exports = Autenticate
