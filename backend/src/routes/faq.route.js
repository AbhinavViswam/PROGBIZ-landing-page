import { Router } from "express";
import {
  createFaqHandler,
  deleteFaqHandler,
} from "../controller/faq.controller.js";
import { auth } from "../middleware/authmiddleware.js";

const router = Router();

router.post("/", auth, createFaqHandler);
router.delete("/:id", auth, deleteFaqHandler);

export default router;
