const router = require('express').Router();
const userManagerController = require('../controllers/user-manager.controller');

const mustBeAuthenticated = require('../middleware/check-authentication');
const mustBeAdmin = require('../middleware/check-admin');

// GET root/api/users
router.get('/', mustBeAuthenticated, mustBeAdmin, userManagerController.getUsers)

// POST root/api/users/promote/userId
router.post('/promote/:id', mustBeAuthenticated, mustBeAdmin, userManagerController.promoteUser);

// POST root/api/users/demote/userId
router.post('/demote/:id', mustBeAuthenticated, mustBeAdmin, userManagerController.demoteUser);

module.exports = router;