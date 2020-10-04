const { body, validationResult } = require('express-validator/check');
// isNotEmpty() not worked
module.exports = {
    rules: [
        body('firstName').trim().not().isEmpty().withMessage('First Name is required.'),
        body('lastName').trim().not().isEmpty().withMessage('Last Name is required.'),
        body('email').trim().not().isEmpty().withMessage('Email is required.')
            .isEmail().withMessage('Invalid Email'),
        body('password').trim().not().isEmpty().withMessage('Password is required.')
            .isLength({ min: 6 }).withMessage('Password should have minimum 6 characters.')
            .custom(val => val.toLowerCase() !== 'password').withMessage('Password should not be "password".')
    ],
    run: (req, res, next) => {
        const colletErr = validationResult(req);
        if (colletErr.isEmpty()) {
            next();
            return;
        }
        let errors = { messages: [] };
        // onlyFirstError for get only single error(even if multiple err exist) for all checked paths 
        colletErr.array({ onlyFirstError: true }).map(({ param, msg }) => {
            errors[param] = true;
            errors.messages.push(msg);
        })
        console.log(colletErr.array());
        //pass it to error handler
        res.status(422).json({ status: false, errors })
    }
}