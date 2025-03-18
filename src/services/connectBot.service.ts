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

    async connect(): Promise<void> {
        try {
		    const commandsBotService = new CommandsBotService(this.bot);
            console.log("✅ Bot iniciado com sucesso!");
            this.bot.launch();
            commandsBotService.startCommands();
            this.bot.telegram.sendMessage(
                "-1002668660614",
                `<b>✅ Bot inicializado com sucesso!</b>\n\n` +
                `<b>📋 Comandos disponíveis:</b>\n\n` +
                `🛠️ <b>/help</b> - <i>Mostra a lista de comandos</i>\n` +
                `🔗 <b>/link</b> - <i>Gera um link de afiliado</i>\n` +
                `💰 <b>/moedas</b> - <i>Gera um link de afiliado com moedas</i>\n\n` +
                `<b>🤖 Bada Bot</b>`,
                { parse_mode: "HTML" }
            );
        
    
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
