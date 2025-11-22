import Testimonial from "../models/testimonial.model.js";

export const createTestimonial = async (name, role, description) => {
  if (!name || !role || !description) {
    return { success: false, message: "All fields are required" };
  }
  const testimonial = await Testimonial.create({
    name,
    role,
    description,
  });
  return { success: true, testimonial };
};

export const editTestimonial = async (id, updateData) => {
  if (!id) {
    return { success: false, message: "Testimonial ID is required" };
  }

  const updated = await Testimonial.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updated) {
    return { success: false, message: "Testimonial not found" };
  }

  return { success: true, testimonial: updated };
};

export const deleteTestimonial = async (id) => {
  if (!id) {
    return { success: false, message: "id is required" };
  }

  const faq = await Testimonial.findByIdAndDelete(id);
  return { success: true, faq };
};

export const getTestimonial = async () => {
  const testimonial = await Testimonial.find();
  return { success: true, testimonial };
};
