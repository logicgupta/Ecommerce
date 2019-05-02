const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const SellerOrderSchema=new Schema({
    orderNumber:{
        type:String,
        required:true
    },
    product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller'
    },
    transId:{
        type:String,
        required:true  
      },
      paymentMode:{
        type:String,
        required:true
    },
    totalPayment:{
        type:Int32,
        required:true
    }
});

module.exports=SellerOrderSchema;