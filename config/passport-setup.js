const passport=require("passport");
const keys=require("./keys");
const User=require("../models/user-model");
const GoogleStrategy=require("passport-google-oauth2").Strategy;

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
        console.log("profile func called");
        console.log(profile);

        User.findOne({
            googleId:profile.id
        }).then((currentuser)=>{
            if(currentuser)
            {
                console.log("data="+currentuser);
                done(null,currentuser);
            }
            else 
            {
                new User({
                    username:profile.displayName,
                    googleId:profile.id
                }).save().then((newuser)=>{
                    console.log("data saved successfully "+newuser);
                    done(null,newuser);
                })
            }
        })


        
    })
);