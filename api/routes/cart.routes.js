const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const mustBeAuthenticated = require('../middleware/check-authentication');

// GET root/api/cart/:id
// Get a user's cart
router.get('/:id', cartController.getCart);

// POST root/api/cart
// Add a book to user's cart
router.post('/', mustBeAuthenticated, cartController.addToCart);

// DELETE root/api/cart/:bookId
// Delete book from user's cart
router.delete('/:bookId', mustBeAuthenticated, cartController.deleteFromCart);

// PUT root/api/cart/:bookId
// Update quantity of one of the books in cart
router.put('/:bookId', mustBeAuthenticated, cartController.updateCart);

module.exports = router;