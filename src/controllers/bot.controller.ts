import { Request, Response } from "express";


export default class BotController {

    async connect(req: Request, res: Response): Promise<void> {
        try {
            // const user = await usersService.connect();
        
            res.status(200).send({ msg: 'Bot is running'});
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

}