const mongoose=require('mongoose');
const Seller=require('../Model/seller');
const Product=require('../Model/Product');
const express=require('express');
const multer=require('multer');
const  passport=require('passport');
const bodyParser=require('body-parser');
const router=express.Router();
const UserOrder=require('../Model/UserOrder');
const authenticate=require('../Auth/auth')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/bookOrders',passport.authenticate('jwt', { session: false }),(req,res)=>{

    const order=new UserOrder({orderNumber:req.body.orderNumber,
        product:req.body.product
        ,user:req.user._id,
        transId:req.body.transId,
        paymentMode:req.body.paymentMode,
        totalPayment:req.body.totalPayment
    });
    
    order.save((err,result)=>{
        if(err){
                res.statusCode=500;
                res.header('Content-Type','application/json');
                res.json({'status':false,'err':err,'details':null});
        }
        else{
            res.statusCode=200;
            res.header('Content-Type','application/json');
            res.json({'status':false,'err':err,'details':result});
        }
    });
});


router.get('/orders',passport.authenticate('jwt', { session: false }),(req,res)=>{

    
    UserOrder.findOne({user:req.user._id})
    .populate('product')
    .exec((err,result)=>{

        if(err){
                res.statusCode=500;
                res.header('Content-Type','application/json');
                res.json({'status':false,'err':err,'details':null});
        }
        else{
            res.statusCode=200;
            res.header('Content-Type','application/json');
            res.json({'status':false,'err':err,'details':result});
        }
    });
});

module.exports=router;