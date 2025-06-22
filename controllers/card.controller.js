import asyncHandler from 'express-async-handler';
import Card from '../models/card.model.js';
import cardValidation from '../validations/joi/cardValidation.js';
import generateBizNum from '../utils/generateBizNum.utils.js';

// @des    Get Cards
// @route  GET/cards
// @access public
export const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find();
  if (!cards) {
    res.status(404);
    throw new Error('Cards not found.');
  }

  res.status(200).json(cards);
});

// @des    Get User Cards
// @route  GET/cards/my-cards
// @access registered user
export const getMyCards = asyncHandler(async (req, res) => { });

// @des    Get Card Info
// @route  GET/cards/:id
// @access public
export const getCardInfo = asyncHandler(async (req, res) => { });

// @des    Create Card 
// @route  POST/cards/
// @access registered business user
export const createCard = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  // check authorization 
  if (!userInfo.isBusiness) {
    res.status(403);
    throw new Error('Unauthorized: Only business users are allowed to create business cards.');
  }

  // check card validation
  const { error } = cardValidation.validate(req.body);
  if (error) {
    res.status(400);
    error.details.map(err => { throw new Error(err.message) });
  }

  const bizNum = await generateBizNum(); // generate card biz number

  // create card
  const card = new Card({ ...req.body, bizNumber: bizNum, user_id: userInfo._id });
  await card.save();

  res.status(201).json(card);
});

// @des    Edit Card Info
// @route  PUT/cards/:id
// @access business user who create the card
export const updateCardInfo = asyncHandler(async (req, res) => { });

// @des    Like Card
// @route  PATCH/cards/:id
// @access registered user
export const likeCard = asyncHandler(async (req, res) => { });

// @des    Delete Card
// @route  DELETE/cards/:id
// @access business user who create the card / admin
export const deleteCard = asyncHandler(async (req, res) => { });

