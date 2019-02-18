const User=require("../models/user-model");
module.exports = unique_save = (profile,done) => {
    User.findOne({
        googleId:profile.id
    }).then((currentuser)=>{
        if(currentuser)
        {
            console.log("data="+currentuser);
            done(null,currentuser);
        }
        else 
        {
            new User({
                username:profile.displayName,
                googleId:profile.id
            }).save().then((newuser)=>{
                console.log("data saved successfully "+newuser);
                done(null,newuser);
            })
        }
    })
}