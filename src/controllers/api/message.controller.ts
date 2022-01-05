import { Request, Response } from "express";
import { IMessageBody } from "../../interfaces/messages.interface";

import { IUSER } from "../../interfaces/User.interfaces";
import chatModel from "../../models/chat.model";
import messagesModel from "../../models/messages.model";
import userModel from "../../models/User.model";
import controller from "../controllers.main";

class MessageApi extends controller {

    async create(req: Request, res: Response) {
        const message: IMessageBody = req.body;
        const user = req.currentUser;
        // VALIDATE CHAT ID aND TYPE

        const chat = await chatModel.findOne({
            chatId: message.chatId,
            users: { $in: [user._id] }
        })
        if (!chat) {
            return res.status(404).send({
                message: "Chat not found"
            })
        }
        // END VALIDATE CHAT ID AND TYPE

        const newMessage = await messagesModel.create({ ...message, sender: user._id,/* chatId: chat._id*/ });
        res.status(200).json(newMessage);
    }


}


export default new MessageApi();