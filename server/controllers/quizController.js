const Quiz = require('../models/Quiz');

// @TODO: validate req.body for all
// if there is a valid question mongo id check for it exists in db or not
const addQuiz = (req, res) => {
    const { title, qId } = req.body;
    new Quiz(req.body)
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Quiz Added Successfully',
                result
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const getQuiz = (req, res) => {
    const { id } = req.params;
    // @TODO:validate for id
    Quiz.findById(id)
        .populate('questions')
        .then(result => {
            console.log(result);
            if (!result) {
                res.status(404).json({ message: 'Quiz not exist' });
            }
            else {
                res.status(200).json({
                    message: 'Quiz Fetch Successfully',
                    result
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const updateQuiz = (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    Quiz.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(result => {
            console.log(result);
            if (!result) {
                res.status(404).json({ message: 'Quiz not exist' });
            }
            else {
                res.status(200).json({
                    message: 'Quiz Updated Successfully',
                    result
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const removeQuiz = (req, res) => {
    const { id } = req.params;
    Quiz.findByIdAndDelete(id)
        .then(result => {
            console.log(result);
            if (!result) {
                res.status(404).json({ message: 'Quiz not exist' });
            }
            else {
                res.status(200).json({
                    message: 'Quiz Removed Successfully',
                    result
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const getAllQuiz = (req, res) => {
    Quiz.find({}, 'title')
        .then(result => {
            console.log(result);
            if (!result) {
                res.status(404).json({ message: 'No Active Quizzes found' });
            } else {
                res.status(200).json({
                    message: 'Quizzes Fetched Successfully',
                    result
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

module.exports = { addQuiz, getQuiz, updateQuiz, removeQuiz, getAllQuiz }