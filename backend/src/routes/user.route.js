import { Router } from "express";
import {
  getUserHandler,
  loginUserHandler,
  logoutHandler,
  registerUserHandler,
} from "../controller/user.controller.js";
import { auth } from "../config/authmiddleware.js";

const router = Router();

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);
router.get("/user", auth, getUserHandler);
router.get("/logout", auth, logoutHandler);

export default router;
