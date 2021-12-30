import { Request, Response } from "express";
import { IUSER } from "../../interfaces/User.interfaces";
import dmModel from "../../models/Dm.model";
import userModel from "../../models/User.model";
import controller from "../controllers.main";

class dmApi {

    async openDmOrGet(req: Request, res: Response) {
        const { targetId } = req.params;


        const userTarget = await userModel.findOne({ userId: targetId });
        if (!userTarget) {
            return res.status(404).json({
                status: 404,
                message: 'کاربر یافت نشد'
            });
        }
        const user = req.currentUser;
        let dm = await dmModel.findOne({ users: { $all: [user._id, userTarget._id] } });
        if (!dm) {
            dm = await dmModel.create({ users: [user._id, userTarget._id] });
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


}

export default new dmApi();