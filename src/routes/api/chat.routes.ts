import { Router } from "express";


const router = Router();


// middleware
import Auth from "../../middlewares/auth.middleware";

// controllers
import chatController from "../../controllers/api/chat.controller";



router.get('/user/:targetId', chatController.createOrGetUserChat);

export default router;