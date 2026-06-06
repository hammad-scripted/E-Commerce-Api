// ? authentication middleware for cookie based authentication

const {isTokenValid} = require('../utils/token');
const { CustomError } = require('../errors');
const {UnauthenticatedError}=require('../errors');


const authenticateUser= async (req,res,next)=>{

    const token=req.signedCookies.refreshToken;
    if(!token){
        throw new UnauthenticatedError('Authentication invalid');
    
    }
    const {decoded}=isTokenValid(token);
    console.log(decoded);
    req.user=decoded;
    next();

}
module.exports={authenticateUser};