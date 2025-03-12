import { Telegraf, Context, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/types";
import dotenv from "dotenv";
dotenv.config();

class CommandsBotService {
    private bot: Telegraf;
		private validCommands: string[];

		constructor(bot: Telegraf) {
			this.bot = bot;
			this.validCommands = ["help", "link", "teste"];
	}

    startCommands(): void {
        this.commandHelp();
				this.commandMoedas();
				this.handleUnknownCommand();
				this.finishProcess();
    }
		

		commandHelp() {
			this.bot.help((ctx) => {
				ctx.reply(
					`<b>📋 Lista de comandos:</b>\n\n` +
					`🛠️ <b>/help</b> - <i>Mostra a lista de comandos do bot</i>\n` +
					`🔗 <b>/link</b> - <i>Gera um link de afiliado</i>\n\n` +
					`<b>🤖 Bada Bot</b>`,
					{ parse_mode: "HTML" }
				);
			})
		}

		handleUnknownCommand() {	
			this.bot.hears(/\/\w+/, (ctx) => {
				const messageText = ctx.message?.text?.trim();

				console.log(messageText);
				if (messageText && messageText.startsWith("/")) {
						const command = messageText.substring(1).toLowerCase();
						if (!this.validCommands.includes(command)) {
							ctx.reply(
								`🚫 <b>Comando não reconhecido!</b>\n\n` +
								`Parece que o comando <b>/${command}</b> não está disponível no momento.\n\n` +
								`Por favor, verifique a lista de comandos válidos e tente novamente.\n\n` +
								`<b>Digite /help para ver os comandos disponíveis. </b>😊\n\n` + 
								`<b><i>🤖 Bada Bot</i></b>`,

								{ parse_mode: "HTML" }
							);
						}
				}
			});
		}
	
    commandMoedas() {
        const product = {
            name: "Carro",
            price: "R$ 10,00",
            url: "www.google.com.br"
        };
				this.bot.command("teste", (ctx) => {
					ctx.reply(
						`<b>#AliExpress</b>\n\n` +
						`<b><i>${product.name.toUpperCase()}</i></b>\n` +
						`Valor Aproximado: <b>${product.price}</b>\n\n` +
						`Link: ${product.url}\n\n` + 
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
			});
    }

		finishProcess(): void {
			process.once("SIGINT", () => this.bot.stop("SIGINT"));
			process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
		}


}

export default CommandsBotService;
