// ? authentication middleware for cookie based authentication

const {isTokenValid} = require('../utils/token');
const { CustomError } = require('../errors');
const {UnauthenticatedError}=require('../errors');
const {UnauthorizedError}=require('../errors');

const authenticateUser= async (req,res,next)=>{

    const token=req.signedCookies.refreshToken;
    if(!token){
        throw new UnauthenticatedError('Authentication invalid');
    
    }
    const decoded=isTokenValid(token);
    console.log(decoded);
    req.user=decoded.user;
    next();

}

 const authorizePermissions=(...roles)=>{

    console.log(roles)
    //? roles=['admin','user']
    //? remember js concept of hof and callback,and this is inner function remember the outer function and this is know as closure in js

    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized to access this route")

        }
        next();

    }
   

 }
module.exports={authenticateUser,authorizePermissions};