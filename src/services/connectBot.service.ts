import { Telegraf, Context, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/types";
import dotenv from "dotenv";
import CommandsBotService from "./commandsBot.service";
dotenv.config();

class ConnectBotService {
	private bot: Telegraf;
	
	constructor() {
		const botToken = process.env.BOT_TOKEN;
		if (!botToken) {
			throw new Error("Token not defined!");
		}
		
		this.bot = new Telegraf(botToken);
	}
	
	connect(): void {
		const commandsBotService = new CommandsBotService(this.bot);
		try {
				console.log("Bot is running");
				this.bot.launch();
				commandsBotService.startCommands();
			} catch (error) {
				console.error("Error launching the bot:", error);
			}
    }
		
}

export default ConnectBotService;
