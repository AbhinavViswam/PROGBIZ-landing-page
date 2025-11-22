import {
  createTestimonial,
  deleteTestimonial,
  editTestimonial,
  getTestimonial,
} from "../services/testimonial.service.js";

export const createTestimonialHandler = async (req, res) => {
  try {
    const { name, role, description } = req.body;
    const data = await createTestimonial(name, role, description);

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
    const { name, role, description } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (description) updateData.description = description;

    const data = await editTestimonial(id, updateData);

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

export const getTestimonialHandler = async (req, res) => {
  try {
    const data = await getTestimonial();

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
