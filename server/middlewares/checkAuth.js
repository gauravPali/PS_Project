const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //may get this error  JsonWebTokenError: jwt malformed above is sync func
        // promise not suppeorted
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    status: false,
                    error: err.message
                })
            } else {
                console.log(decoded);
                req.decodedToken = decoded;
                next();
            }
        })
    } else {
        // next(err);
        // if auth heade is malformed
        res.status(404).json({
            status: false,
            error: 'Token does not exist'
        })
    }
}