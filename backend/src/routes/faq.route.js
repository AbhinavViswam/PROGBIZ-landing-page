import { Router } from "express";
import {
  createFaqHandler,
  deleteFaqHandler,
  getFAQHandler,
} from "../controller/faq.controller.js";
import { auth } from "../config/authmiddleware.js";

const router = Router();

router.post("/", auth, createFaqHandler);
router.get("/", getFAQHandler);
router.delete("/:id", auth, deleteFaqHandler);

export default router;
