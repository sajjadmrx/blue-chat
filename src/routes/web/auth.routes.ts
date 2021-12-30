import { Router, Request, Response, NextFunction } from "express";
import passport from 'passport'
const router = Router();



router.get('/login', (req: Request, res: Response, next: NextFunction) => {
    res.render('login')
})


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))



router.get('/callbacks/google',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req: Request, res: Response) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);




export default router;