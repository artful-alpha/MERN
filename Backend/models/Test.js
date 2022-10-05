import mongoose from "mongoose";

const Test = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Test", Test);
