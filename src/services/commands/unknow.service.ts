import { Telegraf } from "telegraf";

const validCommands = ["/help", "/link", "/share", "/moedas"];
class CommandUnknowService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    start(): void {
        console.log("✅ /unknowcommands iniciado com sucesso!");
    
        this.bot.hears(/^\/(\w+)$/, async (ctx) => {
            try {
                const command = ctx.message?.text?.trim().toLowerCase();
    
                if (command && !validCommands.includes(command)) {
                    await ctx.reply(
                        `🚫 <b>Comando não reconhecido!</b>\n\n` +
                        `Parece que o comando <b>${command}</b> não está disponível.\n\n` +
                        `<b>Digite /help para ver os comandos disponíveis.</b> 😊\n\n` +
                        `<b><i>🤖 Bada Bot</i></b>`,
                        { parse_mode: "HTML" }
                    );
                }
            } catch (error) {
                console.error("❌ Erro ao responder comando desconhecido:", error);
    
                try {
                    await ctx.reply("⚠️ Ocorreu um erro ao processar seu comando. Tente novamente mais tarde.");
                } catch (replyError) {
                    console.error("Erro ao tentar avisar o usuário:", replyError);
                }
            }
        });
    }
    
}

export default CommandUnknowService;
