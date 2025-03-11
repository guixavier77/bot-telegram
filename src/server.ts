import express from 'express';
import cors from "cors";
import botRouter from './routes/bot.routes';
import BotService from './services/bot.service';

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.NODE_PORT || '3333'

app.use(express.json({ limit: '10mb' }));
app.use(cors());



const botService = new BotService();
botService.connect()
app.listen(parseInt(port), host, () => console.log(`🚀 bot listening on port ${port}.`))
