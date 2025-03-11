import { Telegraf, Context, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/types";
import dotenv from "dotenv";
dotenv.config();

class BotService {
    private bot: Telegraf;

    constructor() {
			const botToken = process.env.BOT_TOKEN;
			if (!botToken) {
				throw new Error("Token not defined!");
			}

			this.bot = new Telegraf(botToken);
    }

    connect(): void {
			try {
				console.log("Bot is running");
				this.bot.launch();
				this.startCommands();

				this.finishProcess();
			} catch (error) {
				console.error("Error launching the bot:", error);
			}
    }

    startCommands(): void {
        this.bot.help((ctx) => this.commandHelp(ctx));
        this.bot.command("teste", (ctx: NarrowedContext<Context, Update.MessageUpdate<Message.TextMessage>>) => {
            this.commandMoedas(ctx);
        });
    }

    commandHelp(ctx: NarrowedContext<Context, Update.MessageUpdate<Message.TextMessage>>) {
        const helpMessage = `
            *Lista de comandos:*\n\n
            🛠️ \`/help\` - *Mostra a lista de comandos do bot*\n
            🔗 \`/link\` - *Gera um link de afiliado*
        `;
        ctx.reply(helpMessage, { parse_mode: "MarkdownV2" });
    }

    commandMoedas(ctx: NarrowedContext<Context, Update.MessageUpdate<Message.TextMessage>>) {
        const product = {
            name: "Carro",
            price: "R$ 10,00",
            url: "www.google.com.br"
        };


				ctx.reply(
					`<b>#AliExpress</b>\n\n` +
					`<b><i>${product.name.toUpperCase()}</i></b>\n` +
					`Valor Aproximado: <b>${product.price}</b>\n\n` +
					`Link: ${product.url}\n\n` +  // Deixe o link fora de <b></b>
					`<b>https://t.me/ultraofertas</b>\n\n`,
					{
							parse_mode: "HTML",
							reply_markup: {
									inline_keyboard: [
											[{ text: 'Ver no AliexPress', url: 'https://s.click.aliexpress.com/e/_oChhEbN' }]
									]
							}
					}
			);
			
          
    }

		finishProcess(): void {
			process.once("SIGINT", () => {
				this.bot.stop("SIGINT");
			});
			process.once("SIGTERM", () => {
				this.bot.stop("SIGTERM");
			});
		}
}

export default BotService;
