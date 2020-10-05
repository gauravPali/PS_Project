const jwt = require('jsonwebtoken');

exports.generateToken  = payload => {
    console.log(payload);
    // HMAC SHA256 default algo
   return  jwt.sign(payload,process.env.JWT_SECRET);
}
