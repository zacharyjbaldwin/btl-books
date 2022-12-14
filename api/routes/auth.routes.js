const router = require('express').Router();

const authController = require('../controllers/auth.controller');

// POST root/api/auth/login
router.post('/login', authController.login);

// POST root/api/auth/signup
router.post('/signup', authController.signup);

module.exports = router;