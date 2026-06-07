const User=require('../models/User')
const {StatusCodes}=require('http-status-codes');
const {NotFoundError}=require('../errors');
const {BadRequestError}=require('../errors');
const {UnauthenticatedError}=require('../errors');
const {createJwtToken}=require('../utils/token');
const {attachCookiesToResponse}=require('../utils/cookie');
const getAllUsers=async(req,res)=>{

    const users=await User.find({role:'user'}).select('-password ' )
    .sort('-createdAt')
    return res.status(StatusCodes.OK).json({users});


}


const getSingleUser=async(req,res)=>{
    const {id}=req.params;

    const user =await User.findOne({_id:id}).select('-password');
    if(!user){
        throw new NotFoundError(`No user with id:${id}`);
    }
    
    return res.status(StatusCodes.OK).json({user});
}

const showCurrentUser=(req,res)=>{
//! here we are not querying the database we are just sending the user to the client and we are getting the user from the req object via cookies
    return res.status(StatusCodes.OK).json({user:req.user});
}

const updateUser=async(req,res)=>{
    const {name,email}=req.body;

    if(!name || !email){
        throw new BadRequestError("Please provide name and email");
    }
const user =await User.findOneAndUpdate({_id:req.user.userId},{name,email},{new:true,runValidators:true}).select('-password');
const userPayload = { name: user.name, userId: user._id, role: user.role };
//   const token = createJwtToken(userPayload);
  attachCookiesToResponse(res, userPayload);
return res.status(StatusCodes.OK).json({user});
}

const updateUserPassword=async(req,res)=>{
    
    
    const {oldPassword,newPassword}=req.body;
if(!oldPassword || !newPassword){
    throw new BadRequestError("Please provide old password and new password")
}

const user=await User.findOne({_id:req.user.userId});

const isMatch=user.comparePassword(oldPassword);
if(!isMatch){
    throw new UnauthenticatedError('Old password not matched')

}

user.password=newPassword;
await user.save();
return res.status(StatusCodes.OK).json({msg:"Password updated successfully"});
}

module.exports={getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}