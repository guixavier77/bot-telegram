
import axios from 'axios';
import crypto from 'crypto';

interface Product {
  name: string;
  price: string;
  url: string;
  image_url: string;
  affiliate_link: string;
  store: string;
}

class GenerateLinkService {
  constructor() {}

  private convertToString(value: any): string {
    return value.toString();
  }

  private generateSignature(params: Record<string, string>): string {
    const sortedParamsString = Object.entries(params)
      .sort()
      .map(([key, value]) => `${key}${value}`)
      .join('');

    return crypto
      .createHmac('sha256', process.env.BOT_APP_SECRET!)
      .update(sortedParamsString)
      .digest('hex')
      .toUpperCase();
  }

  async getProductSkuDetails(productId: string): Promise<any | null> {
    const url = "https://api-sg.aliexpress.com/sync";
    
    const params: Record<string, string> = {
      app_key: process.env.BOT_APP_KEY!,
      method: "aliexpress.affiliate.product.sku.detail.get",
      timestamp: Date.now().toString(),
      v: "2.0",
      product_id: productId,
      ship_to_country: "BR",
      target_currency: "BRL",
      target_language: "pt",
      sign_method: "sha256",
    };
  
    params["sign"] = this.generateSignature(params);
  
    try {
      const { data } = await axios.get(url, { params });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Erro ao obter detalhes do SKU do produto:", error);
      return null;
    }
  }
  

  private extractProductId(url: string): string | null {
    const match = url.match(/\/item\/(\d+)\.html/);
    return match ? match[1] : null;
  }

  async getAffiliateLink(link: string): Promise<Product | null> {
    const timestamp = this.convertToString(new Date().getTime());
    const trackingId = 'telegramBot';
    const url = 'https://api-sg.aliexpress.com/sync';

    const params: Record<string, string> = {
      app_key: process.env.BOT_APP_KEY!,
      method: 'aliexpress.affiliate.link.generate',
      timestamp: timestamp,
      v: '2.0',
      tracking_id: trackingId,
      promotion_link_type: '0',
      source_values: link,
      sign_method: 'sha256',
    };

    params['sign'] = this.generateSignature(params);

    try {
      const response = await axios.get(url, { params });
      const data = response.data;
    
      const affiliateLink = data?.aliexpress_affiliate_link_generate_response?.resp_result?.result?.promotion_links?.promotion_link ?? '';

      const productId = this.extractProductId(link);
      const productDetails = await this.getProductSkuDetails(productId!);
      if (!productDetails) {
        return null;
      }

      console.log(productDetails.aliexpress_affiliate_product_sku_detail_get_response?.result?.result?.ae_item_info)

      if(!affiliateLink) throw new Error('Erro ao gerar o link de afiliado');
      return {
        name: productDetails.aliexpress_affiliate_product_sku_detail_get_response?.result?.result?.ae_item_info?.title ?? "Não identificado",
        price: 'R$ 0,00', 
        image_url: productDetails.aliexpress_affiliate_product_sku_detail_get_response?.result?.result?.ae_item_info?.image_link,
        store: productDetails.aliexpress_affiliate_product_sku_detail_get_response?.result?.result?.ae_item_info?.store_name,
        url: link,
        affiliate_link: affiliateLink[0].promotion_link,
      };
    } catch (error) {
      console.error("Erro ao gerar o link de afiliado:", error);
      return null;
    }
  }

  sendHelpMessage(ctx: any, command: string): void {
    ctx.reply(
      `<b>⚠️ Instrução Importante:</b>\n\n` +
      `Para gerar o link de um produto${command ? ' com moedas' : ''}, utilize o comando <code>${command}</code> seguido do URL do produto.\n\n` +
      `Exemplo de uso:\n` +
      `<code>${command} https://example.com/produto123</code>\n\n` +
      `<b>🤖 Ofertas Bot</b>`,
      { parse_mode: 'HTML' }
    );
  }

  sendErrorMessage(ctx: any, message: string): void {
    ctx.reply(`⚠️ ${message}`);
  }

  async sendProductLink(ctx: any, product: Product): Promise<void> {
    if (!product.affiliate_link) return;
  
    const imageUrl = product?.image_url ?? '';
  
    await ctx.replyWithPhoto(
      imageUrl,
      {
        caption: `<b>#AliExpress</b>\n\n` +
                `<b>${product?.store}</b>\n\n` +
                `<b><i>${product?.name ?? 'N/A'}</i></b>\n\n` +
                `Link: ${product.affiliate_link}\n\n` +
                `<b>https://t.me/ultraofertas</b>\n\n`,
        parse_mode: 'HTML', 
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔗 Ver no AliExpress', url: product.affiliate_link }]
          ]
        }
      }
    );
  }
  
  

  validateAndExtractUrls(messageText: string): string[] | null {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return messageText.match(urlRegex);
  }

  async getProductAffiliateLink(link: string): Promise<Product | null> {
    const productId = this.extractProductId(link);
    if (!productId) {
      throw new Error("Produto não encontrado ou ID inválido.");
    }

    const product = await this.getAffiliateLink(link);

    if (!product) {
      throw new Error("Produto não encontrado ou indisponível.");
    }

    return product;
  }




}

export default GenerateLinkService;
