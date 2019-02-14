const express=require("express");
const authroutes=require("./routes/auth-routes");
const passport=require("./config/passport-setup");
const app=express();
app.set("view engine","ejs");
app.use("/auth",authroutes);
app.get("/",(req,res)=> {
    res.render('home');
})

app.listen(3000,()=> {
    console.log("listening to port 3000");
})