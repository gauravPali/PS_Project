const router = require('express').Router();
const { addQuestion, getAllQuestions, updateQuestion, removeQuestion, getUnlabelledQuestions } = require('../controllers/questionController');
const { db } = require('../models/Question');


// add a question
router.post('/', addQuestion);

// get all questions
router.get('/', getAllQuestions);

// update a question
router.put('/:id/', updateQuestion);

// remove a question
router.delete('/:id/', removeQuestion);

// get questions not having any category tag
router.get('/unlabelled', getUnlabelledQuestions);

module.exports = router;
