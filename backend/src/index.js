import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import FAQRouter from "./routes/faq.route.js";
import testimonialRouter from "./routes/testimonial.route.js";
import featureRouter from "./routes/feature.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api/faq", FAQRouter);
app.use("/api/testimonial", testimonialRouter);
app.use("/api/feature", featureRouter);

const port = process.env.PORT || 3001;

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
