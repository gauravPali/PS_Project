const router = require('express').Router();
const { addQuestion, getAllQuestions, updateQuestion, removeQuestion } = require('../controllers/questionController');

// add a question
router.post('/', addQuestion);

// get all questions
router.get('/', getAllQuestions);

// update a question
router.put('/:id/', updateQuestion);

// remove a question
router.delete('/:id/', removeQuestion);

module.exports = router;
