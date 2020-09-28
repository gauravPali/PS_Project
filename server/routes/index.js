const auth = require('./auth');
const question = require('./question');
const quiz = require('./quiz');

module.exports = app => {
    app.use('/auth', auth);
    app.use('/question', question);
    app.use('/quiz', quiz);
    app.all('*', (req, res, next) => {
        res.status(404).send({
            status: 'Page not found'
        })
    })
}