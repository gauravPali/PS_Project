const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    body: {
        type: String,
        trim: true
    },
    options: [{ type: String, trim: true }],
    answers: [Number],
})

module.exports = mongoose.model('Question', questionSchema);

// mongoose.ObjectId == Schema.Types.ObjectId !=mongoose.Types.ObjectId 
// mongoose.Types.ObjectId  = create new objecid
