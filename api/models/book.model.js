const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn13: { type: String, required: true },
    summary: { type: String, required: false, default: 'No summary available.' },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    quantityInStock: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);