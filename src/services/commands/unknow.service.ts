import { Telegraf } from "telegraf";


class CommandUnknowService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    start(): void {
        const validCommands = ["/help", "/link", "/teste"];
        this.bot.hears(/\/\w+/, (ctx) => {
          const command = ctx.message?.text?.trim().toLowerCase();
          if (command && !validCommands.includes(command)) {
              ctx.reply(
                  `🚫 <b>Comando não reconhecido!</b>\n\n` +
                  `Parece que o comando <b>${command}</b> não está disponível.\n\n` +
                  `<b>Digite /help para ver os comandos disponíveis.</b> 😊\n\n` +
                  `<b><i>🤖 Bada Bot</i></b>`,
                  { parse_mode: "HTML" }
              );
          }
      });
    }
}

export default CommandUnknowService;
