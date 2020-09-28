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
// responses =time:44, responses: [{qid:aaa,answers:[r_id]}]
const saveQuizResponse = (req, res) => {
    const { quizId } = req.params;
    // validate req.body;
    // get req.user
    // const id = { req.user }
    const userId = '5f713498bf76062ed95d1b14';
    User.findById(userId)
        .then(user => {
            console.log(user);
            if (!user) {
                res.status(404).send({ message: 'User not exist' });
            } else {
                // calculate score from responses recorded
                Quiz.findById(req.params.id)
                    .populate('questions')
                    .then(quiz => {
                        console.log(quiz);
                        // score calculate
                        let score = 0;
                        req.body.responses.forEach(response => {
                            for (const ques of quiz.questions) {
                                if (ques.id === response.q_id) {
                                    if (JSON.stringify(ques.answers.sort()) === JSON.stringify(response.answers.sort())) {
                                        score += 1;
                                        break;
                                    }
                                }
                            }
                        });
                        const currQuizData = {
                            startTime: req.body.time,
                            responses: req.body.responses,
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
                            currQuiz[0].record.push(currQuizData);
                            currQuiz[0].avgScore = (currQuiz[0].avgScore + score) / currQuiz[0].record.length;
                            user.quizHistory[matchedIndex] = currQuiz[0];
                        } else {
                            // first time
                            const currQuiz = [{
                                quizId: req.params.id,
                                record: [currQuizData],
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

const getQuizResponse = (req, res) => {

};

const getQuizHistory = (req, res) => {
    const { quizId } = req.params.id;
    const userId = '5f713498bf76062ed95d1b14';
    User.findById(userId, { "quizHistory.quizId": { $eq: req.params.id } })
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'Not Found',
                    result
                })
            } else {
                res.status(201).json({
                    message: "Fetchd Score and avg score",
                    result
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })

};

module.exports = { addQuiz, getQuiz, updateQuiz, removeQuiz, getAllQuiz, saveQuizResponse, getQuizResponse, getQuizHistory }