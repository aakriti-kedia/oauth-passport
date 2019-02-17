const mongo=require("mongoose");
const schema=new mongo.Schema({
    username:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true,
        minlength:1
    }
})
const Post=mongo.model("posts",schema);
module.exports = Post;