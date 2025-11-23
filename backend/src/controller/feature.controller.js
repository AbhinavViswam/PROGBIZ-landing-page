import cloudinary from "../config/cloudinary.js";
import {
  createFeature,
  deleteFeature,
  editFeature,
  getFeature,
} from "../services/feature.service.js";

export const createFeatureHandler = async (req, res) => {
  // try {
    const { title, subtitle, content } = req.body;
    const loaclPath = req?.file.path;
    const result = await cloudinary.uploader.upload(loaclPath, {
      folder: "reppoo/uploads",
    });

    const imgurl = result.secure_url;

    const data = await createFeature(title, subtitle, content, imgurl);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  // } catch (error) {
  //   res.status(500).json({ success: false, message: "Server error" });
  // }
};

export const editFeatureHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content } = req.body;
    const updatedData = {};
    if (title) updatedData.title = title;
    if (subtitle) updatedData.subtitle = subtitle;
    if (content) updatedData.subtitle = subtitle;
    if (req.file) updatedData.imgurl = `/uploads/${req?.file?.filename}`;

    const data = await editFeature(id, updatedData);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteFeatureHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteFeature(id);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getFeatureHandler = async (req, res) => {
  try {
    const data = await getFeature();

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
