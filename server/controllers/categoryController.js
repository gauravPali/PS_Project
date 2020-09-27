const Category = require('../models/Category');
const Quiz = require('../models/Quiz');


const addNewCategory = (req, res) => {
    // validate req.body
    // @TODO:No duplicates name allowed
    const { name, detail, questions } = req.body;
    new Category(req.body)
        .save()
        .then(result => {
            console.log(result);
            res.status(201).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
}


const getAllCategory = (req, res) => {
    Category.find({})
        .then(result => {
            const list = {};
            result.forEach(category => {
                const { name, detail, questions, quizzes } = category;
                list[name] = {
                    detail,
                    questionsCount: questions.length,
                }
            })
            res.status(200).send(list)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
}

const getSingleCategory = (req, res) => {
    const { id } = req.params;
    // @TODO: id should be valid mongoid (add validatione verywhere)
    // id should exist in db 
    Category.findById(id)
        .populate(['questions', 'quizzes'])
        .then(result => {
            console.log(result);
            // @TODO: if result is nullQuestion
            if (!result)
                res.status(404).json({ message: 'Category not exist' });
            else
                res.status(500).send(result);
        }).catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
}


const updateCategory = (req, res) => {
    const { id } = req.params.id;
    // validate tha data first
    // const {name , detail , }
    const updateOj = {};

}


// @TODO:if any category does not exist and there should be required msg
const removeCategory = (req, res) => {
    const { id } = req.params;
    //  findByIdAndRemove  -> a mongo findAndModify remove command
    Category.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Category not exist' });
            }
            else {
                res.status(201).send(result);
            }

        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })
}

module.exports = {
    addNewCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    removeCategory
}