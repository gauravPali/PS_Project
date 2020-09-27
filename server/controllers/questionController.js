const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

const addQuestion = (req, res) => {
    // validate req.body
    new Question(req.body)
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Question Added Successfully',
                result
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const getAllQuestions = (req, res) => {
    // @TODO validate req.body
    //pagination
    Question.find({})
        .then(result => {
            res.status(200).json({
                message: 'Question Fetched Successfully',
                result
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const updateQuestion = (req, res) => {
    const { id } = req.params;
    console.log(id); console.log(req.body);
    // @TODO:
    // validate req.body
    // sending whole body 
    // if want to send updated parts only then change the below query
    Question.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(result => {
            console.log(result);
            if (!result)
                res.status(404).json({ message: 'Question not exist' });
            else
                res.status(200).json({
                    message: 'Question Updated Successfully',
                    result
                });
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}


// changing this fun. after deletingg question if quiz updation fails?
const removeQuestion = (req, res) => {
    // validate req.body
    const { id } = req.params;
    Question.findByIdAndDelete(id)
        .then(result => {
            console.log(result);
            if (!result) {
                res.status(404).json({ message: 'Question not exist' });
            }
            else {
                // remove the question ref from quiz too
                Quiz.updateMany({ 'questions': result.id }, { $pull: { questions: result.id } })
                    .then(quizzes => {
                        console.log(quizzes);
                        res.status(200).json({
                            message: 'Question Removed Successfully',
                            result
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send('Internal Server Error');
                    })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

module.exports = { addQuestion, getAllQuestions, updateQuestion, removeQuestion }
