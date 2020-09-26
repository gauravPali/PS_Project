const jwt = require('jsonwebtoken');

exports.generateToken  = payload => {
    console.log(payload);
   return  jwt.sign(payload,process.env.JWT_SECRET);
}
