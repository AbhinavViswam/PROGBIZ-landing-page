import FAQ from "../models/faq.model.js";

export const createFaq = async (question, answer) => {
  if (!question || !answer) {
    return { success: false, message: "Question and answer are required" };
  }

  const faq = await FAQ.create({ question, answer });
  return { success: true, faq };
};

export const deleteFaq = async (id) => {
  if (!id) {
    return { success: false, message: "id is required" };
  }

  const faq = await FAQ.findByIdAndDelete(id);
  return { success: true, faq };
};
