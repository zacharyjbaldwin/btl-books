const router = require('express').Router();

const mustBeAuthenticated = require('../middleware/check-authentication');
const mustBeAdmin = require('../middleware/check-admin');
const bookController = require('../controllers/book.controller');

// GET root/api/books
// Get all books in the database.
router.get('/', bookController.getAllBooks);

// root/api/books/:bookId
// Get a single book in the database by id
router.get('/:id', bookController.getBookById);

// DELETE root/api/books/:id
// Delete a single book from the database.
router.delete('/:id', mustBeAuthenticated, mustBeAdmin, bookController.deleteBook);

// POST root/api/books
// Add a single book to the database.
router.post('/', mustBeAuthenticated, mustBeAdmin, bookController.addBook);

// PUT root/api/books/:id
// Edit a single book in the database.
// Users must be logged in and must have isAdmin = true on their token to reach this route.
router.put('/:id', mustBeAuthenticated, mustBeAdmin, bookController.updateBook);

module.exports = router;