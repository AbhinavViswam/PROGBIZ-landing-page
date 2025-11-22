import { Router } from "express";
import { auth } from "../config/authmiddleware.js";
import {
  createFeatureHandler,
  deleteFeatureHandler,
  editFeatureHandler,
  getFeatureHandler,
} from "../controller/feature.controller.js";
import { upload } from "../config/multer.js";
const router = Router();

router.post("/", auth, upload.single("imgurl"), createFeatureHandler);
router.get("/", getFeatureHandler);
router.put("/:id", auth, upload.single("imgurl"), editFeatureHandler);
router.delete("/:id", auth, deleteFeatureHandler);

export default router;
