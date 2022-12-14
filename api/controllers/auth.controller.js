const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Logger = require('../helpers/loghelpers');

const JWT_SECRET = process.env.JWT_SECRET || require('../keys.json').JWT_SECRET;


// POST root/api/auth/login
module.exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            error: 'Bad request. Missing email or password.'
        });
    }

    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    error: 'EMAIL_DOES_NOT_EXIST'
                });
            }
  
            fetchedUser = {
                email: user.email,
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                isAdmin: user.isAdmin
            };
  
            bcrypt.compare(req.body.password, user.password)
                .then((match) => {
                    if (!match) {
                        return res.status(401).json({
                            error: 'INCORRECT_PASSWORD'
                        });
                    }
  
                    const token = jwt.sign(
                        { email: fetchedUser.email, userId: fetchedUser.userId, firstname: fetchedUser.firstname, lastname: fetchedUser.lastname, isAdmin: fetchedUser.isAdmin },
                        JWT_SECRET,
                        { expiresIn: '1h' }
                    );
  
                    res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        userId: fetchedUser.userId,
                        firstname: fetchedUser.firstname,
                        lastname: fetchedUser.lastname,
                        isAdmin: fetchedUser.isAdmin,
                        email: fetchedUser.email
                    });
                });
        })
        .catch(() => {
            return res.status(500).json({
                error: 'Internal error.'
            });
        });
};

// POST root/api/auth/signup
module.exports.signup = (req, res) => {
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.password) {
        return res.status(400).json({
            error: 'Bad request.'
        });
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(409).json({
                    error: 'EMAIL_ALREADY_IN_USE'
                });
            }

            bcrypt.hash(req.body.password, 10)
                .then((hashedPassword) => {
                    const user = new User({
                        email: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: hashedPassword,
                        isAdmin: false
                    });

                    user.save()
                        .then((user) => {
                            Logger.addLog('authentication',`${req.body.firstname} ${req.body.lastname} created an account`);
                            res.status(201).json({
                                message: 'User created.',
                                user: user
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({
                                message: 'Signup failed.',
                                error: error
                            });
                        });
                });
        })
        .catch(() => {
            return res.status(500).json({
                error: 'Internal error.'
            });
        });
};