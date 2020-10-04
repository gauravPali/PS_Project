const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const router = require('./routes');
require('dotenv').config();
require('./utils/mongooseConnectionEvents');

const port = process.env.PORT || 8081;
const mongoURI = process.env.MONGO_URI;
// useNewUrlParser : uri string parse  depracation
// useUnifiedTopology :  use new connection engine of mongodb driver
// useCreateIndex : collection.ensureIndex is deprecated. 
// socketTimeoutMS is 30000 ms
const mongoConnectConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
mongoose.connect(mongoURI, mongoConnectConfig)
    .then(() => {
        console.log('db connected');
    })
    .catch(err => {
        console.log(err);
    });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
router(app);

app.listen(port, function () {
    console.log(`app lisening at ${port}`);
})


