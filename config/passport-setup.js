const passport=require("passport");
const keys=require("./keys");
const GoogleStrategy=require("passport-google-oauth2").Strategy;
passport.use(
    new GoogleStrategy({
        clientID:keys.google.clientId,
        clientSecret:keys.google.secret,
        callbackURL:'/auth/google/redirect'
    },(accessToken,refreshToken,profile,done)=> {
        console.log("profile func called");
        console.log(profile);
    })
);