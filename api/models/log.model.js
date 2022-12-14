const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    event: { type: String, required: true},
    message: { type: String, required: true},
    timestamp: { type: String, required: true }
});
module.exports = mongoose.model('Log', logSchema);