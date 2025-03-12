import { Telegraf } from "telegraf";
import { identifyPlatform } from "../../../utils/commands/identifyPlatform";
import { TYPE_PLATFORM } from "../../types/commands/typesPlatform";


class CommandLinkService {
	private bot: Telegraf;

	constructor(bot: Telegraf) {
		this.bot = bot;
	}

	start(): void {
		console.log("✅ /link iniciado com sucesso!");
		this.bot.command('link', (ctx) => {
			const messageText = ctx.message.text;
			const urlRegex = /(https?:\/\/[^\s]+)/g;
			const urls = messageText.match(urlRegex);
			if (urls && urls.length > 0) {
				const linkProduct = urls[0];
				const typePlatform = identifyPlatform(linkProduct);
				if(typePlatform !== TYPE_PLATFORM.ALIEXPRESS) {
					return ctx.reply(
						`<b>⚠️ Instrução Importante:</b>\n\n` +
						`Bot disponível apenas para produtos AliexPress.\n\n` +
						`<b>🤖 Bada Bot</b>`
					, {parse_mode: 'HTML'});
				}
				const product = {
					name: 'Carro',
					price: 'R$ 10,00',
					url: 'www.google.com.br'
				};
		
				ctx.reply(
					`<b>#${typePlatform}</b>\n\n` +
					`<b><i>${product.name.toUpperCase()}</i></b>\n` +
					`Valor Aproximado: <b>${product.price}</b>\n\n` +
					`Link: ${product.url}\n\n` +
					`<b>https://t.me/ultraofertas</b>\n\n`,
					{
						parse_mode: 'HTML',
						reply_markup: {
							inline_keyboard: [
								[{ text: 'Ver no Aliexpress', url: 'https://s.click.aliexpress.com/e/_oChhEbN' }]
							]
						}
					}
				);
			} else {
				ctx.reply(
					`<b>⚠️ Instrução Importante:</b>\n\n` +
					`Para gerar o link de um produto, utilize o comando <code>/link</code> seguido do URL do produto.\n\n` +
					`Exemplo de uso:\n` +
					`<code>/link https://example.com/produto123</code>\n\n` +
					`<b>🤖 Bada Bot</b>`
				, {parse_mode: 'HTML'});

			}
		});
	}
}

export default CommandLinkService;
