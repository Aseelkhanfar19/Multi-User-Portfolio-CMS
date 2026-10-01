// This file is responsible of endpoints of authentication

import {Router} from "express";
import auth from "../controllers/authController.js";

const router = Router();

router.post("/register",auth.register);

router.post("/login",auth.login);



//Will used in server file to reach the endpoints here
export default router; 
