const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn13: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

const contentsSchema = mongoose.Schema({
    item: bookSchema,
    quantity: { type: Number, required: true }
});

const orderSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contents: [contentsSchema],
    sendTo: { type: String, required: true },
    addrLine1: { type: String, required: true },
    addrLine2: { type: String, required: false, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    cardType: { type: Number, required: true },
    last4CardDigits: { type: Number, required: true },
    status: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    timestamp: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
