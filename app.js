const express=require("express");
const authroutes=require("./routes/auth-routes");
const passportSetup=require("./config/passport-setup");
const passport=require("passport");
const cookieSession=require("cookie-session");
const profileroutes = require("./routes/profile-routes");
const postroutes = require("./routes/post-routes");


const mongo=require("mongoose");
const keys=require("./config/keys");
const app=express();
app.set("view engine","ejs");
app.use("/css",express.static("views"));
//cookie codes

//session cookie setup
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookiekey]
}));
//passport initialize 
app.use(passport.initialize());
app.use(passport.session());

//--------
mongo.connect(keys.mongodb.url,(e)=> {
    if(e)
    console.log(e);
    else 
    console.log("connected to db");
});
app.use("/auth",authroutes);
app.use("/profile",profileroutes);
app.use("/post",postroutes);
app.get("/",(req,res)=> {
    res.render('home',{user:req.user});
})

app.listen(3000,()=> {
    console.log("listening to port 3000");
})