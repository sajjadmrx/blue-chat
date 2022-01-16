import { Router } from "express";


const router = Router();


// middleware
import Auth from "../../middlewares/auth.middleware";

// controllers
import messageController from "../../controllers/api/message.controller";


router.post('/', messageController.create);
router.get('/:chatId', messageController.getMessages);

export default router;