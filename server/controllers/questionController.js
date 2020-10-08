const Question = require('../models/Question');

const addQuestion = (req, res) => {
    // validate req.body
    new Question(req.body)
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: true,
                id: result.id,
                message: 'Question Added Successfully',
                errors: null
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const getAllQuestions = (req, res) => {
    const { pageNo, offSet } = req.query;
    const skipVal = Number(offSet) * (Number(pageNo) - 1);
    console.log(skipVal);
    Question.countDocuments()
        .then(count => {
            Question.find({}, { isActive: 1, id: 1, body: 1 })
                .sort({ _id: -1 })
                .skip(skipVal)
                .limit(Number(offSet))
                .then(questions => {
                    res.status(200).json({
                        status: true,
                        questions,
                        erorr: null,
                        count
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        error: 'Internal Server Error'
                    });
                })
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                status: false,
                error: 'Internal Server Error'
            });
        })
}

const updateQuestion = (req, res) => {
    // const { id } = req.params;
    console.log(`%c${JSON.stringify(this.params)}`, `color: blue; font-weight: bold; font-size: 16px;`);

    // @TODO:
    // validate req.body
    // sending whole body 
    // if want to send updated parts only then change the below query
    Question.findOneAndUpdate({ _id: id, isActive: true }, { $set: req.body }, { new: true })
        .then(result => {
            console.log(result);
            if (!result) {
                res.status(404).json({ message: 'Question does not exist' });
            }
            else {
                res.status(200).json({
                    message: 'Question Updated Successfully',
                    result
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

const toggleQuestionState = (req, res) => {
    console.log(req.body);
    const { id, isActive } = req.body;
    Question.findOneAndUpdate({ _id: id }, { isActive: !isActive }, { new: true, fields: { isActive: 1, id: 1, body: 1 } })
        .then(result => {
            if (!result) {
                res.status(404).json({
                    status: false,
                    message: 'Question does not exist',
                    result: null
                });
            }
            else {
                const message = isActive ? 'Question Disabled Successfully.' : 'Question Enabled Successfully.'
                res.status(200).json({
                    status: true,
                    message,
                    result,
                });
            }
        }).catch(error => {
            const message = isActive ? 'Disabled Failed' : 'Enabled Failed';
            res.status(404).json({
                status: false,
                message,
                result: null
            });
        })
}

module.exports = { addQuestion, getAllQuestions, updateQuestion, toggleQuestionState }
