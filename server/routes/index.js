const auth = require('./auth');
const category = require('./category');
const question = require('./question');


module.exports = app => {
    app.use('/auth',auth);
    app.use('/categories',category);
    app.use('/questions',question);
    app.all('*',(req,res,next) => {
        res.status(404).send({
            status:'Page not found'
        })
    })
}