import { Telegraf } from "telegraf";


class CommandHelpService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    start(): void {
      console.log("✅ /help iniciado com sucesso!");
  
      this.bot.help(async (ctx) => {
          try {
              await ctx.reply(
                  `<b>📋 Lista de comandos:</b>\n\n` +
                  `🛠️ <b>/help</b> - <i>Mostra a lista de comandos</i>\n` +
                  `🔗 <b>/link</b> - <i>Gera um link de afiliado</i>\n` +
                  `💰 <b>/moedas</b> - <i>Gera um link de afiliado com moedas</i>\n\n` +
                  `<b>🤖 Bada Bot</b>`,
                  { parse_mode: "HTML" }
              );
          } catch (error) {
              console.error("Erro ao enviar resposta do /help:", error);
              if (error.code !== 'ECONNRESET') {
                  try {
                      await ctx.reply("❌ Ocorreu um erro ao processar seu comando. Tente novamente mais tarde.");
                  } catch (err) {
                      console.error("Erro ao tentar avisar o usuário:", err);
                  }
              }
          }
      });
  }
  
}

export default CommandHelpService;
