const router=require("express").Router();
const authcheck = (req,res,next)=> {
    if(!req.user)
    res.redirect("/auth/login");
    else 
    next();
}
router.get("/",authcheck,(req,res)=>{
    console.log("req in profile"+req.user);
    res.render("profile",{user:req.user});
});
module.exports = router;