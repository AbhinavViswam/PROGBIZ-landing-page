import { createFaq, deleteFaq, getFAQ } from "../services/faq.service.js";

export const createFaqHandler = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const data = await createFaq(question, answer);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteFaqHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteFaq(id);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getFAQHandler = async (req, res) => {
  try {
    const data = await getFAQ();

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
