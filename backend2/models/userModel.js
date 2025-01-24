const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        userName:{
            type:String,
            required:true,
            min:3,
            max:20,
            unique:true
        },
        profilePicture:{
            type:Object
        },
        email:{
            type:String,
            required:true,
            max:40,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
            min:4
        },
        role:{
            type:String,
            required:true,
            enum:["user", "admin", "visitor"],
            lowercase:true,
            default:"user"
        },

    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("User", UserSchema)