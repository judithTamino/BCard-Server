import { Router } from 'express';
import auth from '../auth/auth.service.js';
import { createCard, deleteCard, getCardInfo, getCards, getMyCards, likeCard, updateCardInfo } from '../controllers/card.controller.js';

const cardRouter = Router();

cardRouter.get('/', getCards); 
cardRouter.get('/my-cards', auth, getMyCards); // Get business user cards
cardRouter.get('/:id', getCardInfo);
cardRouter.post('/', auth, createCard);
cardRouter.put('/:id', auth, updateCardInfo);
cardRouter.patch('/:id', auth, likeCard) // Mark cards as favorite
cardRouter.delete('/:id', auth, deleteCard);

export default cardRouter;