import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
});

const Feature = mongoose.model("Feature", featureSchema);
export default Feature;
