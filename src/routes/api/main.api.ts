import { Router } from "express";


const router = Router();



// middleware
import Auth from "../../middlewares/auth.middleware";



// routes
import userRoute from './users.routes'
import chatRoute from './chat.routes'



router.use(Auth.isLoginApi)

router.use('/users', userRoute)
router.use('/chats', chatRoute)



export default router;