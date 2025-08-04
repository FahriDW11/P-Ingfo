import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Untitled Task",
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      default: "No description provided",
      minlength: 5,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
