const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const ejs= require("ejs");
require("dotenv").config();

app.use(express.static("public"));
app.set('view engine','ejs');



const level1routes = require('./api/routers/level1s');
const level2routes = require('./api/routers/level2s');
const level3routes = require('./api/routers/level3s');
const level4routes = require('./api/routers/level4s');


// mongoose.connect("mongodb+srv://admin-nikhil:NikPra-0806@cluster0-ijmsp.mongodb.net/todolistDB", {useNewUrlParser: true,, useUnifiedTopology: true});
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
app.use(morgan('dev'));
app.use( '/upload', express.static('upload'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
app.get('/',(req,res)=>{
  res.render('index');
})
app.use('/level1',level1routes);
app.use('/level2',level2routes);
app.use('/level3',level3routes);
app.use('/level4',level4routes);


app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(err);
})
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error:{
          message:error.message
      }
  })
})






module.exports=app;