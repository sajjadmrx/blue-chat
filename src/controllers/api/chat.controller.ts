import { Request, Response } from "express";

import { IUSER } from "../../interfaces/User.interfaces";
import chatModel from "../../models/chat.model";
import userModel from "../../models/User.model";
import controller from "../controllers.main";

class ChatApi extends controller {


    async createOrGetChat(req: Request, res: Response) {
        const { chatId } = req.params;




        let chat = await chatModel.findOne({ chatId });
        let user;
        if (!chat) {
            user = await userModel.findOne({
                userId: chatId
            });
            if (user) {
                chat = await chatModel.create({
                    users: [user._id, req.currentUser._id],
                    isGroup: false
                })
            }
        }

        if (!chat) {
            return res.status(404).json({
                status: 404,
                message: 'چت یافت نشد'
            });
        }

        chat = await chat.populate('users')

        let item = {}

        res.status(200).json({
            ...chat.toJSON(),
            messages: []
        })
    }


}

export default new ChatApi();