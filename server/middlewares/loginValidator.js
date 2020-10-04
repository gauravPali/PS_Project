const { body, validationResult } = require('express-validator/check');

module.exports = {
    rules: [
        body('email').trim().not().isEmpty().withMessage('Email is required.')
            .isEmail().withMessage('Invalid Email'),
        body('password').trim().not().isEmpty().withMessage('Password is required.')
            .isLength({ min: 6 }).withMessage('Password should have minimum 6 characters.')
    ],
    run: (req, res, next) => {
        const colletErr = validationResult(req);
        if (colletErr.isEmpty()) {
            next();
            return;
        }
        let errors = { messages: [] };
        colletErr.array({ onlyFirstError: true }).map(({ param, msg }) => {
            errors[param] = true;
            errors.messages.push(msg);
        })
        console.log(colletErr.array());
        res.status(422).json({ status: false, errors })
    }
}