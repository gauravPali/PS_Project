const router = require('express').Router();
const { addQuestion, getAllQuestions, updateQuestion, disableQuestion } = require('../controllers/questionController');

// add a question
router.post('/', addQuestion);

// get all questions
router.get('/', getAllQuestions);

// update a question
router.put('/:id/', updateQuestion);

// remove a question (soft delete)
router.put('/:id/remove', disableQuestion);

module.exports = router;
