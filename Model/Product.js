const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({

    ProductId:{
        type:String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    ProductImageUrl:{
        type:String,
        required:true
    },
    ProductDesc:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:String,
        required:true
    },
    ProductQty:{
        type:String,
        required:true
    },
    ProductCategory:{
        type:String,
        required:true
    },
    ProductSeller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sellers'
    }
});
module.exports=mongoose.model('Product',productSchema);