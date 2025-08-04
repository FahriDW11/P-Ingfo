import mongoose from "mongoose";

const taskLogSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evidance: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TaskLog = mongoose.model("TaskLog", taskLogSchema);
export default TaskLog;
