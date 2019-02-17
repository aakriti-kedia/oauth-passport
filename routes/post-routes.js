const router=require("express").Router();
const Post=require("../models/post-model");
const bp=require("body-parser");
const urlep = bp.urlencoded({extended:false});
router.post("/save",urlep,(req,res)=>{
    console.log("req.body in post save");
    console.log(req.body);
    Post.findOne({
        username:req.body.username,
        post:req.body.post.trim()
    })
    .then((data)=>{
        // console.log("data in find post"+data);
        // console.log("type of data"+typeof(data));
        if(!data)
        {
            // console.log("post not found in db");
            new Post({
                username:req.body.username,
                post:req.body.post.trim()
            })
            .save()
            .then((post)=>{
                console.log("post saved successfully"+post);
                // console.log("view posts="+view_post());
                Post.find({}).select("username post").then((d)=>{
                    // res.send(data);
                    // console.log("data in view_post="+data);
                    res.render('profile',{user:post.username,posts:d});
                }).catch(e => {
                    console.log(e);
                })
            })
            .catch((err)=>{
                console.log("error in saving post\n"+err);
            })
        }
        else 
        {
            console.log("post already exists");
            Post.find({}).select("username post").then((d)=>{
                // res.send(data);
                // console.log("data in view_post="+data);
                res.render('profile',{user:data.username,posts:d});
            })
        }
        
       
    })
    .catch((e)=>{
        console.log("some error while using find-one in post-routes.js");
    })
    
    
    // return router.redirect("/post/view");
})
// const view_post = function(){
//     // res.send("I reached view page");
//     Post.find({}).select("username post").then((data)=>{
//         // res.send(data);
//         // console.log("data in view_post="+data);
//         return data;
//     }).catch(e => {
//         return e;
//     })
// }
module.exports = router;