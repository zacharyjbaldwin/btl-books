const router = require('express').Router();
const logController = require('../controllers/log.controller');
const mustBeAuthenticated = require('../middleware/check-authentication');
const mustBeAdmin = require('../middleware/check-admin');

// GET root/api/logs
// gets all logs in the database
router.get('/', mustBeAuthenticated, mustBeAdmin, logController.getLog);

module.exports = router;