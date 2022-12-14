const router = require('express').Router();
const userController = require('../controllers/user.controller');
const mustBeAuthenticated = require('../middleware/check-authentication');

// route for updating firstname, lastname, email
router.put('/', mustBeAuthenticated, userController.updateDetails)

module.exports = router;