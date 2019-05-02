const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const cartSchema=new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    qty:{
        type:int32,
        required:true
    }
});

module.Schema=mongoose.model('UserCart',cartSchema);