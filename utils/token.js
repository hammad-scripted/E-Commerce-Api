const jwt=require('jsonwebtoken');

// ? create token

const createJwtToken=(user)=>{
    return jwt.sign({user},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
}


// ? verify token
const isTokenValid=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports={createJwtToken,isTokenValid};