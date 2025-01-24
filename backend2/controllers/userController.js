const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET

const register = async(req, res, next) => {
    try {
        const {userName, email, role, password} = req.body;

        const checkUserName = await User.findOne({userName});

        if(checkUserName)
            return res.status(400).json({msg:"userName already exist"});

        const checkEmail = await User.findOne({email});
        
        if(checkEmail)
            return res.status(400).json({msg:"Email already present"});

        const saltRounds = 10;

        const hashSalt = await bcrypt.genSalt(saltRounds);

        const hashPassword = await bcrypt.hash(password, hashSalt)

        const user = {
            userName,
            email,
            role,
            password:hashPassword,
        }

        const newUser = new User(user);

        const savedUser = await newUser.save()

        return res.status(200).json({
            status:200,
            message:"user Created successfully",
            data:{
                _id: savedUser._id,
                userName:savedUser.userName,
                email:savedUser.email,
                role:savedUser.role
            }
        })

    } catch (error) {
        console.log("error", error)
        return res.status(400).json({
            status:400,
            message:error.message
        })
    }
}


const login = async(req, res, next) => {
    try {
        const {email, password} = req.body
        
        if(!email || !password)
            return res.status(400).json({message:"Email and Password is required"})

        const user = await User.findOne({email})

        if(!user)
            return res.status(400).json({message:"Email or Password is incorrect"})

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) 
            return res.status(400).json({message:"Email or Password is incorrect"})
        
        return res.status(200).json({
            status:200,
            message:"successfully login",
            data:user ,
        })
        
    } catch (error) {
        console.log("error", error)
        return res.status(400).json({
            status:400,
            message: error.message
        })
    }
}

const getAllUsers = async (req, res, next) => {
    try {        
        const users = await User.find().select("-password"); 

        res.status(200).json({
            status: 200,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
};


module.exports = {register, login, getAllUsers}
