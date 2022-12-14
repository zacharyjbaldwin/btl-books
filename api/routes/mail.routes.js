const router = require('express').Router();
const mailController = require('../controllers/mail.controller');

router.post('/test', mailController.sendTestMail);

module.exports = router;