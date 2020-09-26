const auth = require('./auth');


module.exports = app => {
    app.use('/auth',auth);
    app.all('*',(req,res,next) => {
        res.status(404).send({
            status:'Page not found'
        })
    })
}