const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sendTo: { type: String, required: true },
    addrLine1: { type: String, required: true },
    addrLine2: { type: String, required: false, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    defaultAddr: { type: Boolean, required: false, default: false }
});

module.exports = mongoose.model('Address', addressSchema);