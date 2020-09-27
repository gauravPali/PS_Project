const router = require('express').Router();
const  { addNewCategory, getAllCategory, getSingleCategory , updateCategory, removeCategory } = require('../controllers/categoryController');


// add new category
router.post('/',addNewCategory);


// get all categories @TODO:pagination
router.get('/',getAllCategory);


// get a single category
router.get('/:id/', getSingleCategory);

// update a category(s)
router.put('/:id/',updateCategory);

// remove  category(s)
router.delete('/:id', removeCategory);

module.exports = router;