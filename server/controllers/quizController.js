const Quiz = require('../models/Quiz');
const User = require('../models/User');

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

// example
// responses =timeTaken:44, responses: [ {q_id:aaa,answers:[r_id]}]
const saveQuizResponse = (req, res) => {
    const { id } = req.params;
    const { timeTaken, responses } = req.body;
    // validate req.body;
    // get req.user
    // const id = { req.user }
    const userId = '5f713498bf76062ed95d1b14';
    User.findById(userId)
        .then(user => {
            if (!user) {
                res.status(404).send({ message: 'User not exist' });
            } else {
                // calculate score from responses recorded
                Quiz.findById(id)
                    .populate('questions')
                    .then(quiz => {
                        console.log('pa');
                        console.log(quiz);
                        // score calculate
                        let score = 0;
                        responses.forEach(response => {
                            for (const ques of quiz.questions) {
                                if (ques.id === response.q_id) {
                                    if (JSON.stringify(ques.answers.sort()) === JSON.stringify(response.answers.sort())) {
                                        score += 1;
                                        break;
                                    }
                                }
                            }
                        });
                        console.log(score);
                        const currQuizData = {
                            timeTaken,
                            responses,
                            score
                        }
                        let currQuiz = [], matchedIndex = null;
                        if (user.quizHistory.length) {
                            currQuiz = user.quizHistory.filter((quizData, index) => {
                                console.log(quizData.quizId === req.params.id);
                                if (quizData.quizId == req.params.id) {
                                    matchedIndex = index;
                                    return true;
                                }
                                else
                                    return false;
                            })
                        }
                        if (currQuiz.length) {
                            // already attempted quiz
                            currQuiz[0].submissions.push(currQuizData);
                            currQuiz[0].avgScore = (currQuiz[0].avgScore + score) / currQuiz[0].submissions.length;
                            user.quizHistory[matchedIndex] = currQuiz[0];
                        } else {
                            // first time
                            const currQuiz = [{
                                quizId: req.params.id,
                                submissions: [currQuizData],
                                avgScore: score
                            }];
                            user.quizHistory.push(currQuiz[0]);
                        }
                        console.log(user.quizHistory);
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).send(result);
                            }).catch(error => {
                                console.log(error);
                                res.status(500).send('Internal Server Error');
                            })
                    }).catch(error => {
                        res.status(500).send('1 Internal Server Error');
                    })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('2 Internal Server Error');
        })
};


// @TODO: if any quiz is deletd then quiz to be deleted from user quizHistory
// whole quiz need to be fetched and the user answered the question which needs to be populated in response data.
const getQuizResponse = (req, res) => {
    // quiz id should exist and record id too
    const { id, submitId } = req.params;
    const userId = '5f713498bf76062ed95d1b14';
    User.findById(userId, { firstName: 1, quizHistory: { $elemMatch: { quizId: req.params.id } } })
        .then(result => {
            const { quizHistory } = result;
            if (!result) {
                res.status(404).json({
                    message: 'User Not Found',
                    result
                })
            } else {
                if (quizHistory.length === 0) {
                    res.status(200).json({
                        message: "Quiz does not exist",
                    });
                } else {
                    // get your answers
                    const quizResult = quizHistory[0].submissions.find(record => {
                        return record.id === submitId;
                    })
                    if (quizResult !== undefined) {
                        // get coorect answers and questions of quiz
                        Quiz.findById(req.params.id, '-_id')
                            .populate('questions')
                            .then(quiz => {
                                if (quiz) {
                                    res.status(200).json({
                                        message: "Fetchd Single Quiz Response & Quiz",
                                        quizResult,
                                        quiz
                                    });
                                } else {
                                    res.status(404).json({
                                        message: "Quiz Does not exist now",
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send('Internal Server Error');
                            })
                    } else {
                        res.status(200).json({
                            message: "It is not a valid Submission",
                        });
                    }
                }
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
};

const getQuizSubmissions = (req, res) => {
    //  each submission score, date and time,how much time spent
    const userId = '5f713498bf76062ed95d1b14';
    User.findById(userId, { firstName: 1, quizHistory: { $elemMatch: { quizId: req.params.id } } })
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'User Not Found',
                    result
                })
            } else {
                // if quiz id not exist 
                if (result.quizHistory.length === 0) {
                    res.status(200).json({
                        message: "Quiz does not exist",
                    });
                } else {
                    res.status(200).json({
                        message: "Fetchd Score and avg score",
                        result
                    });
                }
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
};

module.exports = { addQuiz, getQuiz, updateQuiz, removeQuiz, getAllQuiz, saveQuizResponse, getQuizResponse, getQuizSubmissions }