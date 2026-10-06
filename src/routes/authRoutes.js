// This file is responsible of endpoints of authentication

import {Router} from "express";
import auth from "../controllers/authController.js";

const router = Router();

// will put the middleware here , either by app.use(middleware ) or by add it to each enpoint in the routes

router.post("/register",auth.register);

router.post("/login",auth.login);



//Will used in server file to reach the endpoints here
export default router; 
