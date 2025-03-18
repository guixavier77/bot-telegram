import { Telegraf } from "telegraf";
import HelpCommand from "./commands/help.service";
import LinkCommand from "./commands/link.service";
import UnknownCommand from "./commands/unknow.service";
import CommandMoedasService from "./commands/moedas.service";

interface CommandService {
    start(): void;
}

class CommandsBotService {
    private bot: Telegraf;
       constructor(bot: Telegraf) {
        this.bot = bot;
    }

    startCommands(): void {
        new HelpCommand(this.bot).start();
        new LinkCommand(this.bot).start();
        new CommandMoedasService(this.bot).start();
        new UnknownCommand(this.bot).start();
    }
}

export default CommandsBotService;
