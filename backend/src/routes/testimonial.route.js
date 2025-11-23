import { Router } from "express";
import { auth } from "../config/authmiddleware.js";
import {
  createTestimonialHandler,
  deleteTestimonialHandler,
  editTestimonialHandler,
  getTestimonialHandler,
} from "../controller/testimonial.controller.js";
import { upload } from "../config/multer.js";

const router = Router();

router.post("/", createTestimonialHandler);
router.get("/", getTestimonialHandler);
router.put("/:id", auth, upload.single("avatarurl"), editTestimonialHandler);
router.delete("/:id", auth, deleteTestimonialHandler);

export default router;
