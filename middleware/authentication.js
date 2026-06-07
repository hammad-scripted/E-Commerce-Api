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

 const authorizePermissions=(req,res,next)=>{
    console.log(`admin route`);

    if(req.user.role!=='admin'){
        throw new UnauthorizedError('Unauthorized to access this route')
    }
    next()

 }
module.exports={authenticateUser,authorizePermissions};