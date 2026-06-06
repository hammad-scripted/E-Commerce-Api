
const User=require('../models/User');
const {StatusCodes}=require('http-status-codes');
const {BadRequestError}=require('../errors');
const {NotFoundError}=require('../errors');
const {UnauthenticatedError}=require('../errors');
const {CustomAPIError}=require('../errors');
const register=async(req,res)=>{

    const {name,email,password}=req.body;
    // ? find the existing user
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new BadRequestError('Email already in use');
    }
    // first generated user is admin

    const isFirstAccount=await User.countDocuments({})===0; 
    const role=isFirstAccount?'admin':'user';

    const user=await User.create({name,email,password,role});
    return res.status(StatusCodes.CREATED).json({user});

}
const login=async(req,res)=>{
    res.send("Login User");
}

    const logout=async(req,res)=>{
    res.send("Logout User");
}

module.exports={register,login,logout}