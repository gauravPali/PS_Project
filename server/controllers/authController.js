const User = require('../models/User');
const { generateToken } = require('../utils/token');

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                user.validatePassword(password, (err, isMatched) => {
                    if (isMatched) {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }
                        const token = generateToken(payload);
                        res.send(token);
                    } else {
                        res.send('password is not matched');
                    }
                });
            } else {
                // auth failed
                res.status(401).send('user is not registered');
            }
        })
        .catch(err => {
            console.log('err');
            res.status(500).send(err);
        })
}

const register = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    User.findOne({ email })
        .then(user => {
            console.log(user);
            console.log('---');
            if (user) {
                res.status(409).send('Already exists');

            } else {
                new User({ firstName, lastName, email, password })
                    .save()
                    .then(user => {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }
                        const token = generateToken(payload);
                        res.status(201).json({
                            user,
                            token
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            error: err
                        });
                        console.log(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

module.exports = {
    login,
    register
}