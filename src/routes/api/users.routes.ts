import { Router } from "express";
import usersController from "../../controllers/api/users.controller";


const router = Router();


// middleware
import Auth from "../../middlewares/auth.middleware";



router.get('/', usersController.find)






export default router;