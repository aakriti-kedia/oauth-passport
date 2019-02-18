const passport=require("passport");
const keys=require("./keys");
const User=require("../models/user-model");
const GoogleStrategy=require("passport-google-oauth2").Strategy;
const FacebookStrategy=require("passport-facebook").Strategy;
const unique_save=require("../controllers/unique_save");
passport.serializeUser((user,done)=>{
        done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
    
})
passport.use(
    new GoogleStrategy({
        clientID:keys.google.clientId,
        clientSecret:keys.google.secret,
        callbackURL:'/auth/google/redirect'
    },(accessToken,refreshToken,profile,done)=> {
        // console.log("profile func called");
        // console.log(profile);
        unique_save(profile,done);
    })
);
passport.use(
    new FacebookStrategy({
        clientID:keys.fb.clientId,
        clientSecret:keys.fb.secret,
        callbackURL:'/auth/facebook/redirect'
    },(accessToken,refreshToken,profile,done)=> {
        unique_save(profile,done);
    })
);