const User=require('../models/User')
const {StatusCodes}=require('http-status-codes');
const {NotFoundError}=require('../errors');
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

    res.send("showCurrentUser")
}

const updateUser=async(req,res)=>{
    res.send("updateUser"


    )
}

const updateUserPassword=async(req,res)=>{
    res.send("updateUserPassword")
}

module.exports={getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}