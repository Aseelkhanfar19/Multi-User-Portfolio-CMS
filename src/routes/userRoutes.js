import {Router} from "express";

import userController from "../controllers/userController.js";
import authMiddle from "../middleware/authMiddleware.js";

const router = Router(); 

router.delete("/delete",authMiddle.authMiddleware,userController.deleteUser);
router.patch("/changePassword",authMiddle.authMiddleware,userController.changePassword);

export default router;
