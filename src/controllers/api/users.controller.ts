import { Request, Response } from "express";
import userModel from "../../models/User.model";
import controller from "../controllers.main";

class UsersApi extends controller {


    me(req: Request, res: Response) {
        const user = req.currentUser;
        let item = {
            userId: user.userId,
            avatar: user.avatar,
            username: user.username

        }
        res.json({
            ...item,
            isOnline: true
        })
    }

    async find(req: Request, res: Response) {
        let query: any = req.query;
        if (query.username)
            query = { username: new RegExp(query.username, 'i') }
        const user = req.currentUser
        const users = await userModel.find({
            username: query.username,
            userId: { $ne: user.userId }
        }, 'avatar userId username -_id', {
            limit: 10
        });
        res.json(users);
    }


}

export default new UsersApi();