import { Router } from "express";


const router = Router();



// middleware
import Auth from "../../middlewares/auth.middleware";



// routes
import userRoute from './users.routes'
import dmRoute from './dm.routes'

router.use(Auth.isLoginApi)

router.use('/users', userRoute)
router.use('/dm', dmRoute)

export default router;