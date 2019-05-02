const mongoose=require('mongoose');
const passportMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    firstName:{
        type:String,
        default:'',
    },
    lastName:{
        type:String,
        default:''
    },
    google_id:{
        type:String,
        default:''
    },
    google_Token:{
        type:String,
        default:''
    },
    username:{
        type:String,
        required:true
    },
    facebookId:{
        type:String,
        default:''
    },
    password:{
        type:String,
        required:true
    }
});
UserSchema.plugin(passportMongoose);

UserSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

UserSchema.methods.generateAuthToken = function(){

    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token;
 
 }
const User=mongoose.model('User',UserSchema);
module.exports =User;