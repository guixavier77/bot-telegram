import { Telegraf } from 'telegraf';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import GenerateLinkService from './generateLink.service';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Product {
  name: string;
  price: string;
  url: string;
  affiliate_link: string;
}

class CommandMoedasService {
  private bot: Telegraf;
  private generateLinkService = new GenerateLinkService();

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  start(): void {
    console.log("✅ /moedas iniciado com sucesso!");

    this.bot.command('moedas', async (ctx) => {
        try {
            const messageText = ctx.message.text;
            const urls = this.generateLinkService.validateAndExtractUrls(messageText);

            if (!urls || urls.length === 0) {
                return this.generateLinkService.sendHelpMessage(ctx, '/moedas');
            }

            const linkProduct = this.cleanProductLink(urls[0]);

            try {
                const product = await this.generateLinkService.getProductAffiliateLink(linkProduct);
                this.generateLinkService.sendProductLink(ctx, product);
            } catch (error) {
                console.error("❌ Erro ao buscar produto:", error);
                this.generateLinkService.sendErrorMessage(ctx, "Não foi possível gerar o link de afiliado com moedas.");
            }
        } catch (error) {
            console.error("❌ Erro inesperado no comando /moedas:", error);

            try {
                await ctx.reply("⚠️ Ocorreu um erro ao processar seu comando. Tente novamente mais tarde.");
            } catch (replyError) {
                console.error("Erro ao tentar avisar o usuário:", replyError);
            }
        } finally {
            try {
                await ctx.deleteMessage();
            } catch (deleteError) {
                console.warn("⚠️ Não foi possível deletar a mensagem:", deleteError.message);
            }
        }
    });
}

  sendProductLink(ctx: any, product: Product): void {
    ctx.reply(
      `💰\n`+
      `<b>#AliExpress</b>\n\n` +
      `<b><i>${product.name}</i></b>\n` +
      `Link: ${product.affiliate_link}\n\n` +
      `<b>https://t.me/ultraofertas</b>\n\n`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔗 Ver no AliExpress', url: product.affiliate_link }]
          ]
        }
      }
    );
  }

  private cleanProductLink(link: string): string {
    return link.split(".html")[0] + ".html" + "?sourceType=620&BuyNow=true&improveDiscount=Y&channel=coin";
  }

}

export default CommandMoedasService;
