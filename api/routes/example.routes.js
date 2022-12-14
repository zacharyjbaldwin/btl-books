const router = require('express').Router();
const exampleController = require('../controllers/example.controller');

// GET localhost:3000/api/hello
router.get('/hello', exampleController.helloWorld);

module.exports = router;