const router=require("express").Router();
const Post=require("../models/post-model");
const bp=require("body-parser");
const urlep = bp.urlencoded({extended:false});
router.post("/save",urlep,(req,res)=>{
    console.log("req.body in post save");
    console.log(req.body);
    new Post({
        username:req.body.username,
        post:req.body.post.trim()
    })
    .save()
    .then((post)=>{
        console.log("post saved successfully"+post);
    })
    .catch((err)=>{
        console.log("error in saving post\n"+err);
    })
    req.post="";
    // return router.redirect("/post/view");
})
router.get("/view",(req,res)=>{

})
module.exports = router;