import asyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import isValidAddress from "../utils/isValidAddress.js";
import { generateAuthToken } from '../auth/jwt.js';
import editUserSchema from '../validations/joi/editUser.js';
import { ensureDocumentExists } from '../utils/ensureDocumentExists.js';

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
  res.status(201).json(user);
});

// @des Login User
// @route POST/users/login
// @access public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  ensureDocumentExists(user, 'User', res);

  // check if password correct
  const isPasswordValid = await bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error('Invalid Password or Email');
  }

  // genarete token
  const userToken = generateAuthToken(user);
  res.status(200).json(userToken);
});

// @des Get Users
// @route GET/users/
// @access admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const userData = req.user;
  if (!userData.isAdmin) {
    res.status(403);
    throw new Error('You must be an admin to get all users data.')
  }

  const users = await User.find();
  res.status(200).json(users);
});

// @des Get User
// @route GET/users/:id
// @access registered user / admin
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userData = req.user;

  if (!userData.isAdmin && userData._id !== id) {
    res.status(403);
    throw new Error('You are not authorized to view this user`s details.');
  }

  const user = await User.findById(id);
  ensureDocumentExists(user, 'User', res);

  res.status(200).json(user);
});

// @des Edit User
// @route PUT/users/:id
// @access registered user
export const editUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userData = req.user;

  // check authorization 
  if (userData._id !== id) {
    res.status(403);
    throw new Error('You are not authorized to edit this user`s details.');
  }

  // find user
  const user = await User.findById(id);
  ensureDocumentExists(user, 'User', res);

  // Joi validation -> validate input
  const { error } = editUserSchema.validate(req.body);
  if (error) {
    res.status(400);
    error.details.map(err => { throw new Error(err.message) });
  }

  // hash password if it`s being updated
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // update user
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json(updatedUser);
});

// @des Change Business status
// @route PATCH/users/:id
// @access registered user
export const changeBusinessStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userData = req.user;
  const { isBusiness } = req.body;

  // check authorization 
  if (userData._id !== id) {
    res.status(403);
    throw new Error('You are not authorized to change business status of this user.');
  }

  // find user
  const user = await User.findById(id);
  ensureDocumentExists(user, 'User', res);
  // if (!user) {
  //   res.status(404);
  //   throw new Error('User not found');
  // }

  // chack typeof isBusiness
  if (typeof isBusiness !== 'boolean') {
    res.status(400);
    throw new Error('Business status must be true or false.');
  }

  user.isBusiness = isBusiness;
  user.save();
  res.status(200).json(user);
});

// @des Delete User
// @route DELETE/users/:id
// @access registered user / admin
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userData = req.user;

  // check authorization
  if (!userData.isAdmin && userData._id !== id) {
    res.status(403);
    throw new Error('You are not authorized to delete this user.');
  }

  const deletedUser = await User.findByIdAndDelete(id);
  ensureDocumentExists(deletedUser, 'User', res);

  res.status(200).json(deletedUser);
});