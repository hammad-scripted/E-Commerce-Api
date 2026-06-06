const { createJwtToken } = require('../utils/token');
const { isTokenValid } = require('../utils/token');
const attachCookiesToResponse = (res, user) => {
  const token = createJwtToken(user);
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'?true:false,
    signed: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};


module.exports={attachCookiesToResponse}