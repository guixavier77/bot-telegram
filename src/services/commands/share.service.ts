import { Telegraf } from "telegraf";

class CommandShareService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    start(): void {
        this.bot.command("compartilhar", (ctx) => {
            console.log(ctx);
            const input = ctx.message?.text?.split(" ").slice(1).join(" "); 
            if (!input) {
                ctx.reply("Por favor, forneça o link de um produto para compartilhar. Exemplo: /compartilhar https://example.com/produto123");
                return;
            }

            
            const affiliateLink = input; 
            const productName = this.extractProductNameFromURL(affiliateLink); 
            const socialLinks = this.generateSocialShareLinks(productName, affiliateLink); 

            const responseMessage = `📱 Compartilhe o produto "${productName}" com seus amigos e ganhe pontos!\n\n` +
                `Clique nos links abaixo para compartilhar nas suas redes sociais e ajudar a divulgar:\n\n` +
                `🔗 [Compartilhar no Facebook](${socialLinks.facebook})\n` +
                `🐦 [Compartilhar no Twitter](${socialLinks.twitter})\n` +
                `📲 [Compartilhar no WhatsApp](${socialLinks.whatsapp})\n\n` +
                `Você pode usar o seguinte link para divulgar diretamente: [${productName}](${affiliateLink})`;

            ctx.reply(responseMessage, {
                parse_mode: "Markdown",
            });

        });
    }

    private extractProductNameFromURL(url: string): string {
        const productName = url.split("/").pop()?.replace(/-/g, " ") || "Produto desconhecido";
        return productName;
    }

    private generateSocialShareLinks(productName: string, affiliateLink: string) {
        return {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}&quote=${encodeURIComponent(`Confira esse produto: ${productName}`)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(affiliateLink)}&text=${encodeURIComponent(`Confira esse produto: ${productName}`)}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Confira esse produto: ${productName} - ${affiliateLink}`)}`
        };
    }
}

export default CommandShareService;
