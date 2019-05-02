const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy=require('passport-facebook').Strategy;
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const jwt=require('jsonwebtoken');
const config=require('config');
const User=require('../Model/User');

    module.exports=passport.use(new LocalStrategy((username,password,done)=>{

        User.findOne({username:username},(err,user)=>{

            if(err){
                    return done(null,err);
            }
         if(!user){

                return done(null,false,{message:'Incorrect UserName ...'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
              }
            return done(null,user);    

        });

    }));

    exports.getUserToken=function(user){
        return jwt.sign(user,config.get('secretKey'));
    }


    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

      

    var  opts={};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken;
    opts.secretOrKey="4848-4925-5625-5878";

    module.exports=passport.use(new JwtStrategy(opts,
        (payload,done)=>{

            User.findOne({_id:payload._id},(err,user)=>{
                if (err) {
                    return done(err, false);
                }
                else if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }

            });
    }));

    exports.verifyUser = passport.authenticate('jwt', {session: false});

    module.exports=passport.use(new FacebookStrategy({
        clientID:"2027912947516dde",
        clientSecret:"99d424a015d4094adkhekdkf7bce9ff8f7",
        callbackURL:config.get('callbackUrl')
    },(accessToken,refreshUrl,profile,done)=>{
    
        User.findOne({facebookId:profile.id},(err,user)=>{

                if(err){
                    done(null,err);
                }
                else if( !err && !user ){
                    done(null,user);
                }
                else{
                    user=new User({username:profile.displayName});
                    user.firstName=profile.name.displayName;
                    user.lastNmae=profile.name.familyName;
                    user.facebookId=profile.id;
                    user.save().then((err,user)=>{

                        if(err){
                            done(null,user);
                        }
                        else{
                            done(null,user);
                        }
                    });
                }
        });
    }));

    module.exports=passport.use(new GoogleStrategy({
        clientID:'377467913237-000tduk4rjceota80i1v8ntrn51mtqh3.apps.googleusercontent.com',
        clientSecret:'iY_DcJh1qj8XMHGeUgnjONMr',
        callbackURL:'http://localhost:8080/auth/google/callback'
    }
    ,(accessToken,refreshToken,profile,done)=>{

        process.nextTick(function(){

            User.findOne({'google_id':profile.id},(err,user)=>{
                if(err){
                    return done(null,err);
                }
                if(user){
                    return done(null,user);
                }
                else{

                    const newUser=new User();
                    newUser.google_id=profile.id;
                    newUser.google_Token=accessToken;
                    newUser.firstName=profile.displayName;
                    newUser.username=profile.emails[0].value;

                    newUser.save((err)=>{
                        if(err){
                            throw err;
                        }
                        return done(null,newUser);
                    });
                }

            });

        });

    }));


