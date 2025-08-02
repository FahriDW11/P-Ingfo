import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String, // bcryptjs menghasilkan hash sebagai string
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nim: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10,15}$/, "Invalid phone number"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "active", "non-active"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
