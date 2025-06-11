import asyncHandler from 'express-async-handler';
import { verifyAuthToken } from './jwt.js';

const auth = asyncHandler(async (req, res, next) => {
  const userToken = req.header('x-auth-token');
  if (!userToken) {
    res.status(401);
    throw new Error('Please Login');
  }

  const userInfo = verifyAuthToken(userToken);
  if (!userInfo) {
    res.status(403);
    throw new Error('Unauthorized User');
  }

  req.user = userInfo;
  return next();
});

export default auth;