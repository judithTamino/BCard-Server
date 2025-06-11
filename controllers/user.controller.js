import mongoose from "mongoose";
import User from "../models/user.model.js";
import isValidAddress from "../utils/isValidAddress.js";

const isValidName = (name) => {
  const {first, last} = name;
  return first && last;
}

// @des Register User
// @route POST/users
// @access public
export const registerUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, phone, password, address } = req.body;

    if (!isValidName(name) || !email || !phone || !password || !isValidAddress(address)) {
      res.status(400);
      throw new Error('Missing Details');
    }


    // const user = await User.create(req.body);
    // res.status(201).json(user);

  } catch (error) {
    next(error);
  }
};