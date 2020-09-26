const router = require('express').Router();
const { login , register } = require('../controllers/authController');


router.post('/login',login) ;

router.post('/register',register);

router.get('/logout', (req, res) => {
    res.send('pali')
})

module.exports = router;