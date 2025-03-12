import { Telegraf } from "telegraf";

class CommandShareService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    start(): void {
        this.bot.command("compartilhar", (ctx) => {
            const input = ctx.message?.text?.split(" ").slice(1).join(" "); // Pega o link do produto a partir do comando
            if (!input) {
                ctx.reply("Por favor, forneça o link de um produto para compartilhar. Exemplo: /compartilhar https://example.com/produto123");
                return;
            }

            // O link de afiliado será o próprio link fornecido (ou poderia ser manipulado para incluir um parâmetro de afiliado, se necessário)
            const affiliateLink = input; 
            const productName = this.extractProductNameFromURL(affiliateLink); // Extraímos o nome do produto do link para personalizar a mensagem de compartilhamento
            const socialLinks = this.generateSocialShareLinks(productName, affiliateLink); // Gera links de compartilhamento

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

    // Função para extrair o nome do produto a partir do link
    private extractProductNameFromURL(url: string): string {
        // Aqui você pode implementar uma lógica simples para extrair o nome do produto da URL
        // Exemplo: https://example.com/produto123 -> "Produto 123"
        const productName = url.split("/").pop()?.replace(/-/g, " ") || "Produto desconhecido";
        return productName;
    }

    // Gera os links de compartilhamento nas redes sociais
    private generateSocialShareLinks(productName: string, affiliateLink: string) {
        // Construir os links de compartilhamento com base no nome do produto e link de afiliado
        return {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}&quote=${encodeURIComponent(`Confira esse produto: ${productName}`)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(affiliateLink)}&text=${encodeURIComponent(`Confira esse produto: ${productName}`)}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Confira esse produto: ${productName} - ${affiliateLink}`)}`
        };
    }
}

export default CommandShareService;
