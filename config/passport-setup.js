const passport=require("passport");
const keys=require("./keys");
const User=require("../models/user-model");
const GoogleStrategy=require("passport-google-oauth2").Strategy;
const FacebookStrategy=require("passport-facebook").Strategy;
const GithubStrategy=require("passport-github").Strategy;
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
        console.log("profile in google strategy");
        console.log(profile);
        unique_save(profile.id,profile.displayName,done);
    })
);
passport.use(
    new FacebookStrategy({
        clientID:keys.fb.clientId,
        clientSecret:keys.fb.secret,
        callbackURL:'/auth/facebook/redirect'
    },(accessToken,refreshToken,profile,done)=> {
        console.log("profile in fb strategy");
        console.log(profile);
        unique_save(profile.id,profile.displayName,done);
    })
);
passport.use(
    new GithubStrategy({
        clientID:keys.git.clientId,
        clientSecret:keys.git.secret,
        callbackURL:'/auth/github/redirect'
    },(accessToken,refreshToken,profile,done)=> {
        console.log("profile in github strategy");
        console.log(profile);
        unique_save(profile.id,profile.username,done);
    })
);  