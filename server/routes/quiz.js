const router = require('express').Router();
const { addQuiz, getQuiz, updateQuiz, disableQuiz, getAllQuiz, saveQuizResponse, getQuizSubmissions, getQuizResponse } = require('../controllers/quizController');

// add a quiz
router.post('/', addQuiz);

// get all quiz info (active quiz need to be fetched for user)
router.get('/', getAllQuiz);

// get a single quiz
router.get('/:id', getQuiz);

// update a quiz
router.put('/:id/', updateQuiz);

// remove a quiz (soft del)
router.put('/:id/remove', disableQuiz);

// save a quiz(should be active) response
router.post('/:id/submit', saveQuizResponse);

// get all quiz submissions
router.get('/:id/submissions', getQuizSubmissions);

// see a quiz result
router.get('/:id/submissions/:submitId', getQuizResponse);

module.exports = router;