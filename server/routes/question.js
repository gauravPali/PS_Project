const router = require('express').Router();
const { addQuestion, getAllQuestions, updateQuestion, toggleQuestionState } = require('../controllers/questionController');
const questionsValidator = require('../middlewares/questionValidator');

// add a question
router.post('/', questionsValidator.rules , questionsValidator.run , addQuestion);

// get all questions
router.get('/', getAllQuestions);

// update a question
router.put('/id/', updateQuestion);

// remove a question (soft delete)
router.put('/toggle', toggleQuestionState);

module.exports = router;
