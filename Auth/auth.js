const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy=require('passport-facebook').Strategy;
const jwt=require('jsonwebtoken');
const config=require('config');
const Seller=require('../Model/seller');

    module.exports=passport.use(new LocalStrategy((username,password,done)=>{

        Seller.findOne({username:username},(err,seller)=>{

            if(err){
                    return done(null,err);
            }
         if(!seller){

                return done(null,false,{message:'Incorrect UserName --'});
            }
            if (!seller.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
              }
            return done(null,seller);    

        });

    }));
    passport.serializeUser(function(seller, done) {
        done(null, seller.id);
      });
      
      passport.deserializeUser(function(id, done) { 
        User.findById(id, function(err, seller) {
          done(err, seller);
        });
      });


    var  opts={};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey="1212-1212-1212-1212";

    exports.jwtPassport =passport.use(new JwtStrategy(opts,
        (payload,done)=>{

            Seller.findOne({id:payload.sub},(err,seller)=>{
                if (seller) {
                    return done(err, false);
                }
                else if (seller) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }

            });
    }));

    exports.verifySeller = passport.authenticate('jwt', {session: false});

 