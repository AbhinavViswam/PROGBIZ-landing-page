import {
  createTestimonial,
  deleteTestimonial,
  editTestimonial,
} from "../services/testimonial.service.js";

export const createTestimonialHandler = async (req, res) => {
  try {
    const { name, role, avatarurl, description } = req.body;
    const data = await createTestimonial(name, role, avatarurl, description);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editTestimonialHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, avatarurl, description } = req.body;

    const data = await editTestimonial(id, name, role, avatarurl, description);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTestimonialHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteTestimonial(id);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
