import { Router } from "express";


const router = Router();

// routers
import authRoute from "./auth.routes";

// controllers
import homeController from "../../controllers/web/home.controller";

// middlewares
import authMiddleware from "../../middlewares/auth.middleware";

router.use('/auth', authRoute)


router.get("/", authMiddleware.isLogin, homeController.index);


router.get('/logout', authMiddleware.isLogin, homeController.logout);

export default router;