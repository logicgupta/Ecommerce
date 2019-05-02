const mongoose=require('mongoose');
const passportMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const config=require('config');
const jwt=require('jsonwebtoken');

    const SellerSChema=new Schema({
        sellerName:{
            type:String,
            required:true
        },
        sellerImageUrl:{
            type:String,
            required:true,
        },
        storeName:{
            type:String,
            required:true
        },
        sellerMobileNumber:{
            type:String,
            required:true
        },
        sellerGstNumber:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
    });

    SellerSChema.methods.validPassword=function(pwd){
        return (this.password=pwd);
    }

    SellerSChema.methods.generateSellerToken=function(){

        return jwt.sign({_id:this._id},"4848-4925-5625-5878");
    }


    SellerSChema.plugin(passportMongoose,{selectFields:' sellerName storeName sellerMobileNumber sellerGstNumber sellerImageUrl'});

   module.exports=mongoose.model('Sellers',SellerSChema);