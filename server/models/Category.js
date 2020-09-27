const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const categorySchema = new Schema({
    name:{type:String,trim:true},
    detail:{type:String,trim:true},
    questions :[ {type: Schema.Types.ObjectId, ref: 'Question'}],
})

module.exports = mongoose.model('Category',categorySchema);