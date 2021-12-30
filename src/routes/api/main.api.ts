import { Router } from "express";


const router = Router();



// middleware
import Auth from "../../middlewares/auth.middleware";



// routes
import userRoute from './users.routes'


router.use(Auth.isLoginApi)

router.use('/users', userRoute)


export default router;