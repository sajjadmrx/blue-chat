import { Request, Response } from "express";
import controller from "../controllers.main";

class home extends controller {
    index(req: Request, res: Response) {
        res.send(`Hello,  ${req.currentUser?.username}`)
    }
}

export default new home();