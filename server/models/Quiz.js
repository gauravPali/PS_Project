const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quizSchema = new Schema({
    title: {
        type: String,
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model('Quiz', quizSchema);