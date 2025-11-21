import { Router } from "express";
import { loginUserHandler, registerUserHandler } from "../controller/user.controller.js";

const router = Router();

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler)

export default router;
