import asyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import isValidAddress from "../utils/isValidAddress.js";
import { generateAuthToken } from '../auth/jwt.js';

const isValidName = (name) => {
  const { first, last } = name;
  return first && last;
}

// @des Register User
// @route POST/users
// @access public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, address, isBusiness } = req.body;

  if (!isValidName(name) || !email || !phone || !password || !isValidAddress(address) || typeof isBusiness !== 'boolean') {
    res.status(400);
    throw new Error('Missing Details');
  }

  const user = new User(req.body);
  await user.save();
  res.status(201).json({ success: true, msg: 'User created successfully' });
});

// @des Login User
// @route POST/users/login
// @access public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if(!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  // check if password correct
  const isPasswordValid = await bcrypt.compareSync(password, user.password);
  if(!isPasswordValid) {
     res.status(401);
    throw new Error('Invalid Password or Email');
  }

  // genarete token
  const userToken = generateAuthToken(user);
  res.status(200).json({success: true, msg: 'Logged successfully', data: userToken});
}); 