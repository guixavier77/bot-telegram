import { Telegraf } from "telegraf";
import CommandHelpService from "./commands/help.service";
import CommandLinkService from "./commands/link.service";
import CommandUnknowService from "./commands/unknow.service";

class CommandsBotService {
    private bot: Telegraf;

    constructor(bot: Telegraf) {
        this.bot = bot;
    }

    startCommands(): void {
				const commandHelp = new CommandHelpService(this.bot);
				const commandLink = new CommandLinkService(this.bot);
				const commandUnknow = new CommandUnknowService(this.bot);

				commandLink.start();
				commandHelp.start();
				commandUnknow.start();
      
    }
}

export default CommandsBotService;
