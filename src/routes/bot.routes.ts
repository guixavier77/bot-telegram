import { Router } from 'express';
import BotController from '../controllers/bot.controller';

const botRouter = Router();

const botController = new BotController();

botRouter.post('/bot', botController.connect);


export default botRouter