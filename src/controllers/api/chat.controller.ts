import { Request, Response } from "express";

import { IUSER } from "../../interfaces/User.interfaces";
import chatModel from "../../models/chat.model";
import userModel from "../../models/User.model";
import controller from "../controllers.main";

class ChatApi extends controller {

    async openChatOrGet(req: Request, res: Response) {
        const { targetId } = req.params;


        const userTarget = await userModel.findOne({ userId: targetId });
        if (!userTarget) {
            return res.status(404).json({
                status: 404,
                message: 'کاربر یافت نشد'
            });
        }
        const user = req.currentUser;
        let dm = await chatModel.findOne({ users: { $all: [user._id, userTarget._id] } });
        if (!dm) {
            dm = await chatModel.create({ users: [user._id, userTarget._id] });
        }

        dm = await dm.populate('users', 'userId username avatar')
        // check blocked


        // end check blocked

        // Fetch Messages


        // end fetch messages

        delete dm._id
        res.status(200).json({
            status: 200,
            dm,
            messages: []
        })

    }

    async createOrGetUserChat(req: Request, res: Response) {
        const { targetId } = req.params;


        const userTarget = await userModel.findOne({ userId: targetId });
        if (!userTarget) {
            return res.status(404).json({
                status: 404,
                message: 'کاربر یافت نشد'
            });
        }
        const user = req.currentUser;
        let chat = await chatModel.findOne({ users: { $all: [user._id, userTarget._id] }, isGroup: false });
        if (!chat) {
            chat = await chatModel.create({ users: [user._id, userTarget._id] });
        }

        let users = await chat.getUsers();

        users = users.filter(x => x.userId !== user.userId)

        // check blocked


        // end check blocked

        // Fetch Messages

        //  dm.users = dm.users.filter(u => u.userId !== user._id)
        // end fetch messages

        delete chat._id
        res.status(200).json({
            status: 200,
            chat,
            users,
            messages: []
        })

    }

    async find(req: Request, res: Response) {
        const chats = await chatModel.find({
            users: { $in: [req.currentUser._id] }
        }).populate('users', 'userId username avatar latestMessage');
        // chats.map(x => {

        // })
        res.json(chats)
    }

}

export default new ChatApi();