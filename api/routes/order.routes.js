const mustBeAuthenticated = require('../middleware/check-authentication');
const mustBeAdmin = require('../middleware/check-admin');
const router = require('express').Router();
const orderController = require('../controllers/order.controller');

// POST root/api/order/
router.post('/', mustBeAuthenticated, orderController.createOrder);

// GET root/api/order/
// get all orders from the database
router.get('/all', mustBeAuthenticated, mustBeAdmin, orderController.getAllOrders); 

// GET root/api/order/
// get all orders beloging to me
router.get('/', mustBeAuthenticated, mustBeAdmin, orderController.getMyOrders); 

// GET root/api/order/:id
// get order by id, only admins can get any order otherwise you get order belonging to you
router.get('/:id', mustBeAuthenticated, orderController.getOrder);

// GET root/api/order/:orderId
// mark order as shipped or canceled
router.put('/:id', mustBeAuthenticated, orderController.markShippedOrCanceled);

module.exports = router;