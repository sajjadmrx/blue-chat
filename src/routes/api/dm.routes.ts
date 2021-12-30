import { Router } from "express";


const router = Router();


// middleware
import Auth from "../../middlewares/auth.middleware";

// controllers
import dmController from "../../controllers/api/DM.controller";



router.get('/:targetId', dmController.openDmOrGet)






export default router;