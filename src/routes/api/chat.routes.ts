import { Router } from "express";


const router = Router();


// middleware
import Auth from "../../middlewares/auth.middleware";

// controllers
import chatController from "../../controllers/api/chat.controller";

// router.get('/', chatController.find);

router.get('/', chatController.getChats);
router.get('/:chatId', chatController.createOrGetChat);
export default router;