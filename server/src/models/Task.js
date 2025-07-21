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
    subject: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    group: {
      type: [
        {
          groupName: {
            type: String,
            trim: true,
            default: "Default Group",
          },
          groupMembersId: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        },
      ],
      default: [],
    },
    isCompleted: {
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
