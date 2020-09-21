const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
require('./utils/mongooseConnectionEvents');



const port = process.env.PORT || 8081;
const mongoURI = process.env.MONGO_URI;
// useNewUrlParser : uri string parse  depracation
// useUnifiedTopology :  use new connection engine of mongodb driver
// useCreateIndex : collection.ensureIndex is deprecated. 
// socketTimeoutMS is 30000 ms
const mongoConnectConfig = {
    useNewUrlParser:true,  
    useUnifiedTopology:true,
    useCreateIndex:true
}

mongoose.connect(mongoURI,mongoConnectConfig)
.then(() =>{
    console.log('db connected');
})
.catch(err =>{
    console.log(err);
});



app.get('/',(req,res) => {
    const { method, url } = req;
    res.json(req.headers)
})


app.listen(port,function(){
    console.log(`app lisening at ${port}`);
})