const express=require('express');
const passport=require('passport');
const bodyParser=require('body-parser');
const Login=require('../Routes/Login');
const insertProduct=require('../Routes/insertProduct');
const sellerLogin=require('../Routes/sellerLogin');
const bookOrder=require('../Routes/orderProduct');
require('../mongoose/connect')();
module.exports=function(app){
    app.set('view engine','ejs');
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(passport.initialize());
  //  app.use(passport.session());

    // route for home page
    app.get('/', function(req, res,next) {
        res.render('index.ejs'); // load the index.ejs file
        next();
    });
    app.get('/profile', function(req, res) {
        res.render('profile.ejs'); // load the index.ejs file
    });
    app.use('/',Login);
    app.use('/auth',Login);
    app.use('/signUp',Login);
    app.use('/seller',sellerLogin);
    app.use('/',bookOrder);
    app.use('/',insertProduct);

    app.get('/logout', function (req, res) {
        req.logOut();
        res.redirect('/');
    });

}