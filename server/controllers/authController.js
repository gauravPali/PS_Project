const User = require('../models/User');
const { generateToken } = require('../utils/token');

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                user.matchPassword(password, (err, isMatched) => {
                    if (isMatched) {
                        const { id, email, isUser } = user;
                        const token = generateToken({ id, email });
                        res.status(200).json({
                            status: true,
                            errors: null,
                            user: {
                                id,
                                email,
                                isUser,
                                fullName: user.fullName
                            },
                            token
                        })
                    } else {
                        res.status(422).json({
                            status: false,
                            errors: {
                                password: false,
                                messages: ['Incorrect Password.']
                            }
                        })
                    }
                });
            } else {
                res.status(422).json({
                    status: false,
                    errors: {
                        email: true,
                        messages: ['Email is not registered.']
                    }
                })
            }
        })
        .catch(err => {
            console.log('err');
            res.status(500).send('Server Error');
        })
}

const register = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(422).json({
                    status: false,
                    errors: {
                        email: false,
                        messages: ['Email is already in use.']
                    }
                });
            } else {
                new User(req.body)
                    .save()
                    .then(user => {
                        console.log(user.fullName);
                        const { id, email, isUser } = user;
                        const token = generateToken({ id, email });
                        res.status(201).json({
                            status: true,
                            errors: null,
                            user: {
                                id,
                                email,
                                isUser,
                                fullName: user.fullName
                            },
                            token
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            status: false,
                            errors: 'Server Error'
                        });
                        console.log(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
}

const getUser = (req, res) => {
    User.findById(req.decodedToken.id, { password: 0, quizHistory: 0 })
        .then(user => {
            if (user) {
                const { id, email, isUser } = user;
                res.status(200).json({
                    status: true,
                    user: {
                        id,
                        email,
                        isUser,
                        fullName: user.fullName
                    },
                })
            } else {
                res.status(404).json({
                    status: false,
                    error: 'User does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                error: 'Server Error'
            });
        })
}

module.exports = {
    login,
    register,
    getUser
}