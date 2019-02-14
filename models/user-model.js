const mongo=require("mongoose");
const Schema=new mongo.Schema({
    username:String,
    googleId:String
});
const User = mongo.model('User',Schema);
module.exports = User;