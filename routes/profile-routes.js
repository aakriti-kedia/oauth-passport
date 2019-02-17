const router=require("express").Router();
const Post=require("../models/post-model");
const authcheck = (req,res,next)=> {
    if(!req.user)
    res.redirect("/auth/login");
    else 
    next();
}
router.get("/",authcheck,(req,res)=>{
    console.log("req in profile"+req.user);
    Post.find({}).select("username post").then(data => {
        res.render("profile",{user:req.user.username,posts:data});
    })
   
});
module.exports = router;