const User=require("../models/user-model");
module.exports = unique_save = (id,name,done) => {
    User.findOne({
        googleId:id
    }).then((currentuser)=>{
        if(currentuser)
        {
            console.log("data="+currentuser);
            done(null,currentuser);
        }
        else 
        {
            new User({
                username:name,
                googleId:id
            }).save().then((newuser)=>{
                console.log("data saved successfully "+newuser);
                done(null,newuser);
            })
        }
    })
}