const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport_setup = require('./passport/setup');
const auth_routes = require("./routes/auth")



const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex: true})
    .then(console.log(`MongoDB connected`))
    .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{extensions: ["html"]}));


// Passport middleware
passport_setup(passport);

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/user', userRouter);

auth_routes(app,passport);


app.get('*', function(req, res){
    res.status(404).sendFile(path.join(__dirname, 'public','404.html'));
});

module.exports = app;
