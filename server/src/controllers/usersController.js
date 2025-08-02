import User from "../models/User.js";

export async function getAllUsers(_, res) {
  try {
    const users = await User.find({ status: "active" }).select("-password");
    const pendingUsers = await User.find({ status: "pending" });
    res.json({ users, pending: pendingUsers.length });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

export async function editUserRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error });
  }
}

export async function getPengdingUsers(_, res) {
  try {
    const pendingUsers = await User.find({ status: "pending" }).select("-password");
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending users", error });
  }
}

export async function activateUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { status: "active" }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User activated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error activating user", error });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
}
