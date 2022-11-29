const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    //when the jwt verifyies the token, it will get the actual id of a user
    const { _id } = jwt.verify(token, process.env.SECRET)

    //it checks if that id exists in the user table/document
    //we use the verified id to get the user and only select the id of that particular user
    //we added the user property to the request object, it holds the user id
    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth