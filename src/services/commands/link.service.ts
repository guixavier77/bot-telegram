import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Telegraf } from 'telegraf';
import GenerateLinkService from './generateLink.service';

dayjs.extend(utc);
dayjs.extend(timezone);

class CommandLinkService {
  private bot: Telegraf;
  private generateLinkService = new GenerateLinkService();

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  start(): void {
    console.log("✅ /link iniciado com sucesso!");

    this.bot.command('link', async (ctx) => {
        try {
            const messageText = ctx.message.text;
            const urls = this.generateLinkService.validateAndExtractUrls(messageText);

            if (!urls || urls.length === 0) {
                return this.generateLinkService.sendHelpMessage(ctx, '/link');
            }

            const linkProduct = this.cleanProductLink(urls[0]);

            try {
                const product = await this.generateLinkService.getProductAffiliateLink(linkProduct);
                this.generateLinkService.sendProductLink(ctx, product);
            } catch (error) {
                console.error("❌ Erro ao buscar produto:", error);
                this.generateLinkService.sendErrorMessage(ctx, "Não foi possível gerar o link de afiliado.");
            }
        } catch (error) {
            console.error("❌ Erro inesperado no comando /link:", error);

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


  private cleanProductLink(link: string): string {
    return link.split(".html")[0] + ".html";
  }
}

export default CommandLinkService;
