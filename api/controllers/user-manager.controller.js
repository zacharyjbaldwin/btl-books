const User = require('../models/user.model');
const Logger = require('../helpers/loghelpers');

exports.getUsers = (req, res) => {
    User.find()
        .then((users) => {
            let fetchedUsers = [];
            for (let user of users) {
                user.password = undefined;
                fetchedUsers.push(user);
            }
            res.status(200).json({
                users: fetchedUsers
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to fetch users.',
                error:  error
            });
        });
};

exports.promoteUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true })
        .then((user) => {
            Logger.addLog('manager',`${req.userData.firstname} ${req.userData.lastname} promoted user ${user.firstname} ${user.lastname}`);
            res.status(200).json({
                message: `promoted user ${user.firstname} ${user.lastname}`,
                user: user
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to promote user.',
                error:  error
            });
        });
};

exports.demoteUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { isAdmin: false }, { new: true })
        .then((user) => {
            Logger.addLog('manager',`${req.userData.firstname} ${req.userData.lastname} demoted user ${user.firstname} ${user.lastname}`);
            res.status(200).json({
                message: `Demoted user ${user.firstname} ${user.lastname}`,
                user: user
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to demoted user.',
                error:  error
            });
        });
};