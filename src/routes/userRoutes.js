import {Router} from "express";

import userCont from "../controllers/userController.js";
import authMiddle from "../middleware/authMiddleware.js";

const router = Router(); 

router.delete("/delete",authMiddle.authMiddleware,userCont.deleteUser);
router.patch("/changePassword",authMiddle.authMiddleware,userCont.changePassword);
router.patch("/updateUserInfo",authMiddle.authMiddleware,userCont.updateUserInfo);

export default router;
