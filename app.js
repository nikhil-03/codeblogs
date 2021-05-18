const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const ejs= require("ejs");
require("dotenv").config();
const passport = require('passport');
const session=require("express-session");
const passportLocalMongoose=require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const User=require('./api/models/user');

app.use(express.static("public"));
app.set('view engine','ejs');

app.use(session({
  secret:"nik",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
//
// const userSchema = new mongoose.Schema({
//   img:String,
//   name:String,
//   googleId:String
// });
// userSchema.plugin(findOrCreate);
// const User = new mongoose.model('User', userSchema);
//
// User = new mongoose.model('User', userSchema);

//
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user) {
   done(err, user);
 });
});

const level1routes = require('./api/routers/level1s');
const level2routes = require('./api/routers/level2s');
const level3routes = require('./api/routers/level3s');
const level4routes = require('./api/routers/level4s');
const level5routes = require('./api/routers/common');
const pipeline     = require('./api/routers/contents');
const updateblogs  = require('./api/routers/updateblog');
const loging       = require('./api/routers/loging');


// mongoose.connect("mongodb+srv://admin-nikhil:NikPra-0806@cluster0-ijmsp.mongodb.net/todolistDB", {useNewUrlParser: true,, useUnifiedTopology: true});
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});




passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://nikcodeblogs.herokuapp.com/auth/google/codeblog",
  // callbackURL :  "http://localhost:3000/auth/google/codeblog",
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
},
function(accessToken, refreshToken, profile, cb)    {
    // console.log(profile.photos[0].value);
  User.findOrCreate({ googleId: profile.id,name:profile.displayName,img:profile.photos[0].value }, function (err, user) {
    return cb(err, user);
  });
}
)); 

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


app.get("/",(req,res,next)=>{
  res.render("login");
})

app.get('/auth/google',
passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/codeblog',
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect("/logged-in");
});
app.use('/level1',level1routes);
app.use('/level2',level2routes);
app.use('/level3',level3routes);
app.use('/level4',level4routes);
app.use('/common',level5routes);
app.use('/contents',pipeline);
app.use('/cupdate',updateblogs);
app.use("/logged-in",loging);


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




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port,function(){
    console.log("server started sucessfully");
    
});