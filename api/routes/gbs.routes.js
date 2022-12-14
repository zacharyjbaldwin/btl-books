const router = require('express').Router();
const gbsController = require('../controllers/gbs.controller');

// GET root/api/logs
// gets all logs in the database
router.get('/:query', gbsController.getGBSResults);

module.exports = router;