import cors from "cors";
import express from 'express';
import ConnectBotService from './services/connectBot.service';

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.NODE_PORT || '3333'

app.use(express.json({ limit: '10mb' }));
app.use(cors());



const connectBotService = new ConnectBotService();
connectBotService.connect()
app.listen(parseInt(port), host, () => console.log(`🚀 bot listening on port ${port}.`))
