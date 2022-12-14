const Log = require('../models/log.model');

module.exports.getLog = (req, res) => {
    Log.find().then((logs)=> {
        res.status(200).json({
            message: 'Retrieved all logs!', 
            logs: logs.reverse(),
        });
    }).catch(
        (error)=> {
            res.status(500).json({
                error: 'failed to fetch logs', 
            }); 
        }
    )
};