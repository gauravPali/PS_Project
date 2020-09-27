const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quizSchema = new Schema({
    name: {
        type: String,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
})

module.exports = mongoose.model('Quiz', quizSchema);