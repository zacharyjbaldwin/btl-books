const Log = require('../models/log.model');

module.exports.addLog = (event , message) => {
    const log = new Log({
        event: event,
        message: message,
        timestamp: new Date().toUTCString()
    });
    log.save()
    .catch((error) => {
        throw error;
    });
}
