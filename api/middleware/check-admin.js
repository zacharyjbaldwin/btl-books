// This piece of middleware is intended to be used with the middleware provided
// by check-authentication.js. Add this middleware to routes that only admins
// can access AFTER adding the middleware provided by check-authentication.js.
// Otherwise, it will not work.

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // TODO also check in the database that the user is an admin
    if (!req.userData || !req.userData.isAdmin) {
        res.status(401).json({
            error: 'Not authorized.'
        });
    } else if (req.userData.isAdmin == true) {
        next();
    }
};