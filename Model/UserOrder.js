const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const OrderSchema=new Schema({
    
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
    transId:{
        type:String,
        required:true  
      },
      paymentMode:{
        type:String,
        required:true
    },
    totalPayment:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('UserOrder',OrderSchema);