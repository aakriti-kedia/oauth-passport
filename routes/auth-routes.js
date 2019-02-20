const router=require("express").Router();
const passport=require("passport");
router.get("/login",(req,res)=>{
 //   console.log("req.user in login"+req.user);
    res.render("login",{user:req.user});
})
router.get("/logout",(req,res)=>{
    // res.render("login",{disp:req.user});
    req.logout();
    res.redirect("/");
})
router.get("/google",passport.authenticate('google',{
    scope:['profile']
}));
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    console.log("req in redirect"+req.user);
    res.redirect('/profile');
});
router.get("/facebook",passport.authenticate('facebook',{
    scope:['email']
}));
router.get("/facebook/redirect",passport.authenticate('facebook'),(req,res)=>{
    console.log("req in fb redirect"+req.user);
    res.redirect('/profile');
});
router.get("/github",passport.authenticate('github'));
router.get("/github/redirect",passport.authenticate('github'),(req,res)=>{
    console.log("req in github redirect"+req.user);
    res.redirect('/profile');
});

module.exports=router;