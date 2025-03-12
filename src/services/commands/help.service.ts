import { Telegraf } from "telegraf";


class CommandHelpService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    start(): void {
      console.log("✅ /help iniciado com sucesso!");

      this.bot.help((ctx) => {
        ctx.reply(
            `<b>📋 Lista de comandos:</b>\n\n` +
            `🛠️ <b>/help</b> - <i>Mostra a lista de comandos</i>\n` +
            `🔗 <b>/link</b> - <i>Gera um link de afiliado</i>\n\n` +
            `<b>🤖 Bada Bot</b>`,
            { parse_mode: "HTML" }
        );
      });
    }
}

export default CommandHelpService;
