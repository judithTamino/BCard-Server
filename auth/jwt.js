import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export const generateAuthToken = user => {
  // create payload
  const payload = {
    _id: user._id,
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin
  }

  const token = jwt.sign(payload, secret);
  return token;
};

export const verifyAuthToken = token => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};