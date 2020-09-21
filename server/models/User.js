const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{ type:String, required:true},
    lastName:String,
    email:{type:String,unique:true},
    isUser:{type:Boolean, default:true},
    pwd:String
})

const UserModel = mongoose.model('User',userSchema);

