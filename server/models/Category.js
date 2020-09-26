const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const categorySchema = new Schema({
    name:{type:String},
    questions :[ {type: Schema.Types.ObjectId, ref: 'Question'}],
    quizes:[{type: Schema.Types.ObjectId, ref: 'Quiz'}]
})

module.exports = mongoose.model('Category',categorySchema);