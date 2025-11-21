import { Router } from "express";
import { auth } from "../middleware/authmiddleware.js";
import {
  createTestimonialHandler,
  deleteTestimonialHandler,
  editTestimonialHandler,
} from "../controller/testimonial.controller.js";

const router = Router();

router.post("/", auth, createTestimonialHandler);
router.put("/:id", auth, editTestimonialHandler);
router.delete("/:id", auth, deleteTestimonialHandler);

export default router;
