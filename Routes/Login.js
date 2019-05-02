const mongoose=require('mongoose');
const passport=require('passport');
const authenticate=require('../Auth/fb');
const config=require('config');
const express=require('express');
const assert=require('assert');
const loginrouter=express.Router();
const User=require('../Model/User');

loginrouter.post('/signup',(req,res)=>{

    User.register(new User({username:req.body.username})
    ,req.body.password,(err,user)=>{
        
        if(err){
                res.statusCode=500;
                res.header('Content-Type','application/json');
                res.json({'err':err});
        }
        if(req.body.firstName!=null){
            user.firstName=req.body.firstName;
        }
        if(req.body.lastName!=null){
            user.lastName=req.body.lastName;
        }
        user.save().then((err,user)=>{

            if(err){
                res.statusCode=500;
                res.header('Content-Type','application/json');
                res.json({'err':err});
            }
            else{
                passport.authenticate('local',(err,result)=>{
                    if(err){       
                    res.statusCode=500;
                    res.header('Content-Type','application/json');
                    res.json({'err':err});
                    }
                    else{   
                    res.statusCode=200;
                    res.header('Content-Type','application/json');
                    res.json({'success':true,'result':'Successfully Registered !'});
                    }
                });
            }

        });

    });


});

loginrouter.get('/email',(req,res,next)=>{

        passport.authenticate('local',(err,user,info)=>{

            if(err){
                    console.log(err);
                res.statusCode=403;    // Forbidden 
                res.header('Content-Type','application/json');
                res.json({success: true, status: 'You are not logged in !','err':err});
            }
            else if(!user){
                res.statusCode=403;
                res.header('Content-Type','application/json');
                res.json({success: true, status: 'You are not logged in!','err':info});
            }
            
            req.logIn(user,(err)=>{
                    if(err){
                        res.statusCode=403;
                       res.header('Content-Type','application/json');
                        res.json({success: true, status: 'You are not logged in!','err':err});
                    }
            });
           const token =user.generateAuthToken();
            res.statusCode=200;
            res.header('Content-Type','application/json');
            res.json({status:true,result:'Login SucessFull !','token':token});

        })(req,res,next);
    
});


loginrouter.get('/google',passport.authenticate('google', { scope : ['profile', 'email']}),(req,res)=>{
    console.log(req);
    console.log('Google');
});
loginrouter.get('/auth/google/callback',
            passport.authenticate('google'),(req,res)=>{
                console.log(req);
                res.redirect('/profile');
            });



loginrouter
.get('/auth/facebook',passport.authenticate('facebook'),(req,res)=>{
    
    console.log('Starting ');

    if(req.user==null){
        res.statusCode=403;
        res.header('Content-Type','application/json');
        res.json({err:err});
    }
    else{
        res.statusCode=200;
        res.header('Content-Type','application/json');
        res.json({status:true,result:'Login SucessFull !'});
    }
});

loginrouter.get('auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/auth' }));

loginrouter.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});
                                      

module.exports =loginrouter;