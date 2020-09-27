const Question = require('../models/Question');
const Category = require('../models/Category');

const addQuestion = (req, res) => {
    // validate req.body
    new Question(req.body)
        .save()
        .then(result => {
            console.log(result);
            res.status(201).send(result);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}


const getAllQuestions = (req, res) => {
    // validate req.body
    Question.find({})
        .then(result => {
            console.log(res);
            res.status(200).send(result);
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
                res.status(500).send(result);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

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
                // remove the question from category too
                Category.find({})
                    .then(docs => {
                        res.status(201).send(result);
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send('Internal Server Error');
                    })
                res.status(500).send(result);
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}


const getUnlabelledQuestions = (req, res) => {
    Category.find({}, { _id: 0, 'questions': 1 })
        .then(result => {
            let idArr = [];
            result.forEach(elem => {
                idArr = [...idArr, ...elem.questions];
            })
            Question.find({ _id: { $nin: idArr } })
                .then(result => {
                    console.log(result);
                    res.status(200).send(result);
                }).catch(error => {
                    console.log(error);
                    res.status(500).send('Internal Server Error');
                })

        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}



module.exports = {
    addQuestion,
    getAllQuestions,
    updateQuestion,
    removeQuestion,
    getUnlabelledQuestions
}
