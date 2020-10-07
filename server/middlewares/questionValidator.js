const { body, validationResult } = require('express-validator/check');

const checkDuplicates = (arr) => {
    let obj = {};
    for (val of arr) {
        if (!obj[val.trim()])
            obj[val.trim()] = true;
        else
            return false;
    }
    return true;
}

const isValidArray = (arr, len, rule) => {
    if (Array.isArray(arr)) {
        if ((rule === 'exact' && arr.length === len || rule === 'atleast' && arr.length >= len) && arr.filter(v => v.trim()).length === arr.length)
            return true;
        else
            return false;
    }
    return false;
}

module.exports = {
    rules: [
        body('body').trim().not().isEmpty().withMessage('Question is required.')
            .isLength({ min: 5, max: 250 }).withMessage('Question should have minimum 5 and maximum 250 characters.'),
        body('options')
            .custom(value => isValidArray(value, 4, 'exact')).withMessage('Four Options are required.')
            .custom(value => checkDuplicates(value)).withMessage('Options can not be same.')
            .isLength({max: 150}).withMessage('Option should have maximum 150 characters.'),
        body('answers')
            .custom(value => isValidArray(value, 1, 'atleast')).withMessage('Answer(s) are required.')
            .custom(value => checkDuplicates(value)).withMessage('Answer(s) can not be same')
    ],
    run: (req, res, next) => {
        const colletErr = validationResult(req);
        if (colletErr.isEmpty()) {
            next();
            return;
        }
        let errors = {};
        colletErr.array({ onlyFirstError: true }).map(({ param, msg }) => {
            errors[param] = msg;
        })
        console.log(colletErr.array());
        //pass it to error handler
        res.status(422).json({ message: 'Validation Failed', errors, status: false })
    }
}