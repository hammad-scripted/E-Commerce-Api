// ? authentication middleware for cookie based authentication

const {isTokenValid} = require('../utils/jwt');
const { CustomError } = require('../errors');


const protect=(req,res,next)=>{

    const token=req.cookies.refreshToken;
    if(!token){
        throw new CustomError.UnauthorizedError('Not authorized to access this route');
    
    }
    const decoded=isTokenValid(token);
    req.user=decoded.user;
    next();

}
module.exports={protect};