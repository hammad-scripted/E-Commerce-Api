const {createJwtToken}=require('../utils/token');
const {isTokenValid}=require('../utils/token');
const User=require('../models/User');
const {StatusCodes}=require('http-status-codes');
const {BadRequestError}=require('../errors');
const {NotFoundError}=require('../errors');
const {UnauthenticatedError}=require('../errors');
const {CustomAPIError}=require('../errors');

// * register
const register=async(req,res)=>{

    const {name,email,password}=req.body;
    // ? find the existing user
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new BadRequestError('Email already in use');
    }
    //? first generated user is admin

    const isFirstAccount=await User.countDocuments({})===0; 
    const role=isFirstAccount?'admin':'user';

    const user=await User.create({name,email,password,role});
    // * jwt token

const userPayload={name:user.name,userId:user._id,role:user.role}
const token=createJwtToken(userPayload);

// * cookie

res.cookie('refreshToken',token,{
    httpOnly:true,
    secure:true,
    maxAge:1*24*60*60*1000

})
    return res.status(StatusCodes.CREATED).json({user:userPayload});

}
const login=async(req,res)=>{
    res.send("Login User");
}

    const logout=async(req,res)=>{
    res.send("Logout User");
}

module.exports={register,login,logout}