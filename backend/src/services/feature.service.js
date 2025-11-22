import Feature from "../models/feature.model.js";

export const createFeature = async (title, subtitle, content, imgurl) => {
  if (!title || !subtitle || !content || !imgurl) {
    return { success: false, message: "All fields are required" };
  }

  const feature = await Feature.create({
    title,
    subtitle,
    content,
    imgurl,
  });

  return { success: true, feature };
};

export const editFeature = async (id, updatedData) => {
  if (!id) {
    return { success: false, message: "Feature ID is required" };
  }

  const updated = await Feature.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!updated) {
    return { success: false, message: "Feature not found" };
  }

  return { success: true, feature: updated };
};

export const deleteFeature = async (id) => {
  if (!id) {
    return { success: false, message: "id is required" };
  }

  const feature = await Feature.findByIdAndDelete(id);
  return { success: true, feature };
};

export const getFeature = async () => {
  const feature = await Feature.find();
  return { success: true, feature };
};
