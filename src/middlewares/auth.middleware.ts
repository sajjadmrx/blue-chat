import { NextFunction, Response, Request } from "express";
import { IUSER } from "../interfaces/User.interfaces";
import userModel from "../models/User.model";

class Auth {

    async isLogin(req: Request, res: Response, next: NextFunction) {
        const userSession = req.user as IUSER
        if (!userSession)
            return res.redirect('/auth/login')
        const user = await userModel.findById(userSession._id)
        //    res.redirect("/login");
        req.currentUser = user as IUSER;
        return next();

    }

    async isLoginApi(req: Request, res: Response, next: NextFunction) {
        const userSession = req.user as IUSER
        if (!userSession)
            return res.status(401).json({ message: "Unauthorized" })
        const user = await userModel.findById(userSession._id)
        //    res.redirect("/login");
        req.currentUser = user as IUSER;
        return next();

    }




}

export default new Auth();