const router=require("express").Router();
const passport=require("passport");
router.get("/login",(req,res)=>{
    res.render("login",{disp:"logged in"});
})
router.get("/logout",(req,res)=>{
    res.render("login",{disp:"log out"});
})
router.get("/google",passport.authenticate('google',{
    scope:['profile']
}));
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    res.send("redirecturi");
});
module.exports=router;