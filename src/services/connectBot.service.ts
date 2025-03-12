import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import CommandsBotService from "./commandsBot.service";

dotenv.config();

class ConnectBotService {
    private bot: Telegraf;

    constructor() {
        const botToken = process.env.BOT_TOKEN || "";
        if (!botToken) {
            throw new Error("🚨 ERRO: Token do bot não está definido!");
        }
        this.bot = new Telegraf(botToken);
    }

    connect(): void {
        try {
						console.log("✅ Bot iniciado com sucesso!");
						this.bot.launch();
						const commandsBotService = new CommandsBotService(this.bot);
            commandsBotService.startCommands();
            process.once("SIGINT", () => this.shutdown("SIGINT"));
            process.once("SIGTERM", () => this.shutdown("SIGTERM"));
        } catch (error) {
            console.error("❌ Erro ao iniciar o bot:", error);
        }
    }

    private shutdown(reason: string): void {
        console.log(`🛑 Encerrando bot... Motivo: ${reason}`);
        this.bot.stop(reason);
    }
}

export default ConnectBotService;
