const router = require('express').Router();
const { addQuiz, getQuiz, updateQuiz, removeQuiz, getAllQuiz } = require('../controllers/quizController');

// add a quiz
router.post('/', addQuiz);

// get all quiz info
router.get('/', getAllQuiz);

// get a quiz
router.get('/:id', getQuiz);

// update a quiz
router.put('/:id/', updateQuiz);

// remove a quiz
router.delete('/:id/', removeQuiz);

module.exports = router;
