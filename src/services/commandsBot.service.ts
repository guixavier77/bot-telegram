import { Telegraf } from "telegraf";
import HelpCommand from "./commands/help.service";
import LinkCommand from "./commands/link.service";
import UnknownCommand from "./commands/unknow.service";
import CommandShareService from "./commands/share.service";

interface CommandService {
    start(): void;
}

class CommandsBotService {
    private bot: Telegraf;
    private commands: CommandService[];

    constructor(bot: Telegraf) {
        this.bot = bot;
        this.commands = [
            new HelpCommand(this.bot),
            new LinkCommand(this.bot),
            new UnknownCommand(this.bot),
						new CommandShareService(this.bot)
        ];
    }

    startCommands(): void {
        this.commands.forEach(command => command.start());
    }
}

export default CommandsBotService;
