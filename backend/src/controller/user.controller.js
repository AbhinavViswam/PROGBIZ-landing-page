import {
  registerUser,
  getUserById,
  loginUser,
} from "../services/user.service.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
};

export const registerUserHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await registerUser(name, email, password);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.cookie("token", data.token, cookieOptions);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutHandler = (req, res) => {
  res.cookie("token","", cookieOptions);
  res.status(200).json({success:true, message:"Logged out"})
};

export const getUserHandler = async (req, res) => {
  try {
    const id = req.user._id;
    const data = await getUserById(id);

    if (!data.success) {
      return res.status(404).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);

    if (!data.success) {
      return res.status(400).json(data);
    }

    res.cookie("token", data.token, cookieOptions);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
