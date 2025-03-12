import { TYPE_PLATFORM } from "../../src/types/commands/typesPlatform";


export const identifyPlatform = (link: string) => {
  const newLink = link.toLocaleLowerCase();
  if(newLink.includes('aliexpress')) return TYPE_PLATFORM.ALIEXPRESS;
  if(newLink.includes('mercadolivre')) return TYPE_PLATFORM.MERCADO_LIVRE;
  if(newLink.includes('magazineluiza')) return TYPE_PLATFORM.MAGAZINE_LUIZA;
}