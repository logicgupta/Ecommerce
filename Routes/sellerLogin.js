const passport =require('passport');
const authenticate=require('../Auth/auth')
const express=require('express');
const jwt=require('jsonwebtoken');
const route=express.Router();
const config=require('config');
const bodyParser=require('body-parser');
const multer=require('multer');
const Seller=require('../Model/seller');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));

        const storage=multer.diskStorage({
            destination:(req,File,cb)=>{
                cb(null,'public/seller/images');
            },filename:(req,File,cb)=>{
                cb(null,File.originalname);
            }
        });
        const upload=multer({storage:storage});
     
        route.post('/signup',upload.single('userImage'),(req,res)=>{           
            Seller.register(new Seller({username:req.body.username,sellerName:req.body.sellerName,
                storeName:req.body.storeName,sellerMobileNumber:req.body.sellerMobileNumber,sellerGstNumber:req.body.sellerGstNumber,
                sellerImageUrl:req.file.path}),
                req.body.password,(err,seller)=>{
                    if(err){
                        res.statusCode=500;
                        res.setHeader('Content-Type','application/json');
                        res.json({'success':'false','status':'Registration UnSuccessFull','err':err}); 
                    }
                    passport.authenticate('local')(req,res,()=>{
                        res.statusCode=200;
                        res.setHeader('Content-Type','application/json');
                        res.json({'success':'true','status':'Registration SuccessFull'}); 
                        });    
                });
        });

    route.post('/login',(req,res,next)=>{

        passport.authenticate('local',(err,seller,info)=>{

            if(err){
                res.statusCode=403;
                res.header('Content-Type','application/json');
                res.json({success: true, status: 'You are not logged in !','err':err});
            }
            else if(!seller){
                res.statusCode=403;
                res.header('Content-Type','application/json');
                res.json({success: true, status: 'You are not logged in!','err':info});
            }
            
            req.logIn(seller,(err)=>{
                    if(err){
                        res.statusCode=403;
                        res.header('Content-Type','application/json');
                        res.json({success: true, status: 'You are not logged in!','err':err});
                    }
            });
            console.timeLog(req.user)
            const token= jwt.sign({_id:req.user._id},"1212-1212-1212-1212");

            res.statusCode=200;
            res.header('Content-Type','application/json');
            res.json({status:true,result:'Login SucessFull !','token':token});

        })(req,res,next);
    });    
    
    module.exports =route;

