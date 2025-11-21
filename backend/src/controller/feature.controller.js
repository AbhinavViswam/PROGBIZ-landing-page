import {
  createFeature,
  deleteFeature,
  editFeature,
} from "../services/feature.service.js";

export const createFeatureHandler = async (req, res) => {
  try {
    const { title, subtitle, content, imgurl } = req.body;
    const data = await createFeature(title, subtitle, content, imgurl);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editFeatureHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content, imgurl } = req.body;

    const data = await editFeature(id, title, subtitle, content, imgurl);

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
