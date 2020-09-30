const router = require('express').Router();
const { addQuiz, getQuiz, updateQuiz, removeQuiz, getAllQuiz, saveQuizResponse, getQuizSubmissions, getQuizResponse } = require('../controllers/quizController');

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

// save a quiz response
router.post('/:id/submit', saveQuizResponse);

// get all quiz submissions
router.get('/:id/submissions', getQuizSubmissions);

// see a quiz result
router.get('/:id/submissions/:submitId', getQuizResponse);

module.exports = router;