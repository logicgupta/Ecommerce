const mongoose=require('mongoose');
const Seller=require('../Model/seller');
const Product=require('../Model/Product');
const express=require('express');
const multer=require('multer');
const bodyParser=require('body-parser');
const router=express.Router();
const passport=require('passport');
require('../Auth/auth');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const storage=multer.diskStorage({
    destination:(req,File,cb)=>{
        cb(null,'public/seller/images');
    },filename:(req,File,cb)=>{
        cb(null,File.originalname);
    }
});
const upload=multer({storage:storage});
router.post('/insertProduct',passport.authenticate('jwt', { session: false }),upload.single('ProductImageUrl'),async(req,res)=>{ 
   console.log(req.user);
   const  product=new Product({
        ProductId:req.body.ProductId,
        ProductName:req.body.ProductName,
        ProductImageUrl:req.file.path,
        ProductDesc:req.body.ProductDesc,
        ProductPrice:req.body.ProductPrice,
        ProductQty:req.body.ProductQty,
        ProductCategory:req.body.ProductCategory,
        ProductSeller:req.user._id
    });
    const result=await product.save();
    res.send(result);
});

    router.get('/delete',passport.authenticate('jwt', { session: false }),async(req,res)=>{

    const product =await Product.deleteOne({"ProductId":req.body.ProductId});
    res.send(product);

    });

    router.post('/searchPoductOne',async(req,res)=>{
        const product=await Product.findOne({"PoductId":req.body.ProductId});
        res.send(product);
    });

    router.get('/listAllProduct',(req,res)=>{

        Product.find({})
        .populate('ProductSeller').exec((err,product)=>{
            if(err){
                    res.statusCode=500;
                    res.header('Content-Type','application/json');
                    res.json({'sucess':false,'err':err});
            }
            else{

                res.status(200).send(product);
            }
        })
    

    });


    router.get('/getProductByCategory',(req,res)=>{
        if(req.body.ProductCategory==null){
            res.statusCode=500;
            res.header('Content-Type','application/json');
            res.json({'sucess':false,'err':'Category is null'});
        }
        else{
            Product.findOne({"ProductCategory":req.body.ProductCategory})
            .populate('ProductSeller')
            .exec((err,product)=>{

                    if(err){
                        res.statusCode=500;
                        res.header('Content-Type','application/json');
                        res.json({'sucess':false,'err':err});
                    }
                    else{
                        res.statusCode=200;
                        res.header('Content-Type','application/json');
                        res.json({'sucess':true,'detail':product,'err':'null'});
                    }
            });
        }
    });

    router.get('/updateProduct',passport.authenticate('jwt', { session: false }),(req,res)=>{

         Product.updateOne({"ProductId":req.body.ProductId},{"$set":{
            "ProductDesc":req.body.ProductDesc
        }}).exec((err,product)=>{

            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(product);
            }

        });
    });
module.exports=router;