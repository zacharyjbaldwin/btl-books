const Book = require('../models/book.model');
const Logger = require('../helpers/loghelpers');

module.exports.addBook = (req, res) => {
    if (!req.body.title || !req.body.author || !req.body.isbn13 || !req.body.summary
        || !req.body.genre || !req.body.price || !req.body.quantityInStock || !req.body.imageUrl) {
            return res.status(400).json({
                error: 'Bad request.'
            });
        }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn13: req.body.isbn13,
        summary: req.body.summary,
        genre: req.body.genre,
        price: req.body.price,
        quantityInStock: req.body.quantityInStock,
        imageUrl: req.body.imageUrl,
    });

    book.save()
        .then((book) => {
            Logger.addLog('book',`${req.userData.firstname} ${req.userData.lastname} added ${book.title}`); 
            res.status(201).json({
                message: 'Added book',
                book: book
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to add book.',
                error: error
            });
        });
};

module.exports.deleteBook = (req, res) => {
    let title;
    Book.findById(req.params.id)
        .then((book) => {
            title = book.title;
            console.log(`${title}`);
            book.delete()
                .then((mres) => {
                    Logger.addLog('book',`${req.userData.firstname} ${req.userData.lastname} deleted ${title}`);
                    return res.status(200).json({
                        message: `Deleted ${title}.`,
                        mres: mres
                    });
                })
                .catch(() => {
                    return res.status(500).json({
                        error: 'Internal error.'
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Internal error.'
            });
        });
};


module.exports.getAllBooks = (req, res) => {
    Book.find({})
        .then((books) => {
            res.status(200).json({
                message: 'Fetched all books.',
                count: books.length,
                books: books
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Internal error.',
                error: error
            });
        });
};

module.exports.getBookById = (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
            if (!book) {
                return res.status(404).json({
                    error: 'No book found with that ID'
                });
            }

            res.status(200).json({
                messasge: 'Fetched book.',
                book: book
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Internal error.',
                error: error
            });
        });
};

module.exports.updateBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((mres) => {
            Logger.addLog('book',`${req.userData.firstname} ${req.userData.lastname} updated ${req.body.title}`);
            res.status(200).json({
                message: 'Updated book.',
                book: mres
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Internal error',
                error: error
            })
        });
};
