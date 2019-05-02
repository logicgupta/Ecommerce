const mongoose=require('mongoose');
const config=require('config');

module.exports=function(){
    mongoose.connect("mongodb://localhost:27017/ecommerce",{ useNewUrlParser: true })
.then((db)=>{
    console.log('Succesfully Connected To database');
}).catch((err)=>{
    console.log('Error in connecting to Database'+err);
});
};