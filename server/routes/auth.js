const router = require('express').Router();
const { login, register } = require('../controllers/authController');
const registerValidator = require('../middlewares/registerValidator');
const loginValidator = require('../middlewares/loginValidator');
// registerRules = array of functions
// validator = function

router.post('/login', loginValidator.rules, loginValidator.run, login);
router.post('/register', registerValidator.rules, registerValidator.run, register);
router.get('/logout', (req, res) => {
    res.send('----')
})

module.exports = router;