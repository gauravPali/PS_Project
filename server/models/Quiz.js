const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const quizSchema = new Schema({
    text:{
        type:String,
    },
    questions:[{
        type:Schema.Types.ObjectId,
        ref:'Question'
    }]
})




module.exports =   mongoose.model('Question',quizSchema);