const mongoose = require('mongoose');
const brcypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    firstName: { type: String,required:true },
    lastName: String,
    email: { type: String, unique: true,required:true },
    isUser: { type: Boolean, default: true },
    password: String
})


userSchema.method('validatePassword', function (password, cb) {
    console.log(this.password);
    brcypt.compare(password, this.password)
        .then(res => {
            console.log(res);
            cb(null, res);
        })
        .catch(err => {
            cb(err);
        })
})


userSchema.pre('save', function (next) {
    const userDoc = this;
    if (userDoc.isModified('password') === false) {
        return next();
    }

    brcypt.hash(userDoc.password, 8)
        .then(res => {
            console.log(res);
            userDoc.password = res;
            next();
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
})

module.exports = mongoose.model('User', userSchema);

