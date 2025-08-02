import { useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const UserTable = ({ user }) => {
  const [userRole, setUserRole] = useState(user.role);
  const [saving, setSaving] = useState(false);

  const editRole = async (value) => {
    setSaving(true);
    try {
      const response = await api.put(`/users/edit-user-role/${user._id}`, { role: value });
      if (response.status === 200) {
        toast.success("User role updated successfully");
        console.log("User role updated:", response.data);
        setUserRole(value);
      }
    } catch (error) {
      toast.error("Failed to update user role. Please try again.");
    } finally {
      setSaving(false);
      console.log("User role updated:", user.role);
    }
  };

  return (
    <li className="flex items-center p-4 border-b border-base-content">
      <div></div>
      <div className="grow">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.nim}</p>
      </div>
      <div className="flex items-center gap-2">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            editRole(e.target.value);
          }}
          value={userRole}
        >
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
        <button className="btn btn-sm btn-error">
          <Trash2 />
        </button>
      </div>
    </li>
  );
};

export default UserTable;
