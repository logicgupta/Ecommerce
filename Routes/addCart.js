const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const route=express.Router();
const passport=require('passport');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));
const UserCart=require('../Model/userCart');

    route.get('/addCart',passport.authenticate('jwt', { session: false }),(req,res)=>{

        const cart=new UserCart({product:req.body.product,user:req.user._id,qty:req.body.qty});
        cart.save((err,details)=>{

            if(err){
                res.status=500;
                res.header('Content-Type','application/json');
                res.json({'status':false,'err':err});
            }
            else{
                res.status=200;
                res.header('Content-Type','application/json');
                res.json({'status':true,'err':false,'details':details});
            }
        });
    });


    route.get('/getCartDetails',passport.authenticate('jwt', { session: false }),(req,res)=>{

        UserCart.find({},(err,details)=>{
                if(err){

                    res.status=500;
                    res.header('Content-Type','application/json');
                    res.json({'status':false,'err':err,'details':null});
                }
                else{
                    res.status=200;
                    res.header('Content-Type','application/json');
                    res.json({'status':true,'err':false,'details':details});
                }
        });
    });



module.exports=route;