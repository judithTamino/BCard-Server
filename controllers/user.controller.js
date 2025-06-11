import mongoose from "mongoose";
import User from "../models/user.model.js";
import isValidAddress from "../utils/isValidAddress.js";

const isValidName = (name) => {
  const { first, last } = name;
  return first && last;
}

// @des Register User
// @route POST/users
// @access public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, address, isBusiness } = req.body;

    if (!isValidName(name) || !email || !phone || !password || !isValidAddress(address) || typeof isBusiness !== 'boolean') {
      res.status(400);
      throw new Error('Missing Details');
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, msg: 'User created successfully' });

  } catch (error) {
    next(error);
  }
};