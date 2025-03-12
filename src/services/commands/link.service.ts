import { Telegraf } from "telegraf";


class CommandLinkService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    start(): void {
        this.bot.command("teste", (ctx) => {
            const product = {
                name: "Carro",
                price: "R$ 10,00",
                url: "www.google.com.br"
            };
    
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
                            [{ text: 'Ver no Aliexpress', url: 'https://s.click.aliexpress.com/e/_oChhEbN' }]
                        ]
                    }
                }
            );
        });
    }
}

export default CommandLinkService;
