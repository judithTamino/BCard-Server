import _ from 'lodash';
import Card from '../models/card.model.js';

const generateBizNum = async () => {
  if (Card.countDocuments === 8_999_999)
    throw new Error('The app reached the maximum cards');

  let bizNumber;
  do {
    bizNumber = _.random(1_000_000, 9_999_999);
  } while (await isBizNumExsists(bizNumber));

  return bizNumber;
};

const isBizNumExsists = async (bizNumber) => {
  try {
    const card = await Card.findOne({ bizNumber });
    return Boolean(card);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default generateBizNum;