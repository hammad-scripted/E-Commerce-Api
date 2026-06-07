const { createJwtToken } = require('../utils/token');
const { isTokenValid } = require('../utils/token');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const { NotFoundError } = require('../errors');
const { UnauthenticatedError } = require('../errors');
const { CustomAPIError } = require('../errors');
const { attachCookiesToResponse } = require('../utils/cookie');

// * register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  // ? find the existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }
  //? first generated user is admin

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  // * jwt token

  const userPayload = { name: user.name, userId: user._id, role: user.role };
  const token = createJwtToken(userPayload);

  // * cookie
  attachCookiesToResponse(res, userPayload);

  return res.status(StatusCodes.CREATED).json({ user: userPayload });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // ? find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // ? compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid email or password');
  }

  // ? everything is correct now attach cookie

  const userPayload = { name: user.name, userId: user._id, role: user.role };
  const token = createJwtToken(userPayload);
  attachCookiesToResponse(res, userPayload);
  return res.status(StatusCodes.OK).json({ user: userPayload });
};

const logout = async (req, res) => {
    res.cookie('refreshToken'," logout",{
        expires: new Date(Date.now()+5*1000),
        httpOnly: true
    })
   
    res.status(StatusCodes.OK).json({msg:"user logged out"});
};

module.exports = { register, login, logout };
