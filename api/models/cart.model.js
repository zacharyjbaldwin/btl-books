const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true }
});

const cartSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contents: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);