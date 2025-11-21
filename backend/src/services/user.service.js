import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (name, email, password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  const newUser = await User.create({
    name,
    email,
    password: hashedPass,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { success: true, token };
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    return { success: false, message: "User not found" };
  }
  return { success: true, user };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "User does not exists" };
  }

  if (user.role !== "admin") {
    return { success: false, message: "You are not admin" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Invalid credentials" };
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { success: true, token };
};
