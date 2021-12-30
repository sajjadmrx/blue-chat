import { Request, Response } from "express";
import controller from "../controllers.main";

class home extends controller {
    index(req: Request, res: Response) {
        // res.send(`Hello,  ${req.currentUser?.username}`)
        res.render('chat')
    }

    logout(req: Request, res: Response) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                req.logOut()
                res.redirect('/auth/login')
            }
        })
    }
}

export default new home();