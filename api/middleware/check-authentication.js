// Add this middleware to routes which should only be accessible to users that are logged in

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET || require('../keys.json').JWT_SECRET;
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, secret);

    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname
    }

    next();
  } catch (error) {
    res.status(401).json({
      error: 'Not authenticated.'
    });
  }
};
