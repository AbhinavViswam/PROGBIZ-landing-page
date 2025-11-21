import { Router } from "express";
import { auth } from "../middleware/authmiddleware.js";
import {
  createFeatureHandler,
  deleteFeatureHandler,
  editFeatureHandler,
} from "../controller/feature.controller.js";
const router = Router();

router.post("/", auth, createFeatureHandler);
router.put("/:id", auth, editFeatureHandler);
router.delete("/:id", auth, deleteFeatureHandler);

export default router;
