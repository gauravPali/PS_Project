const User = require('../models/User');
const { generateToken } = require('../utils/token');

const login = (req, res) => {
    console.log('finally');
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                user.validatePassword(password, (err, isMatched) => {
                    if (isMatched) {
                        // const payload = {
                        //     id: user.id,
                        //     email: user.email
                        // }
                        // const token = generateToken(payload);
                        // res.send(token);
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
    console.log('i');
    console.log(req.body);
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
                                name: user.fullName,
                                isUser
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

module.exports = {
    login,
    register
}