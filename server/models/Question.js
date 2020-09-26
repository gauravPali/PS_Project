const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text:{
        type:String,
    },
    options:[String],
    coorectAnser:[String]
})




module.exports =   mongoose.model('Question',questionSchema);

// mongoose.ObjectId
// mongoose.Types.ObjectId  = create new objecid
// Schema.Types.ObjectId



