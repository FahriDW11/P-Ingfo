import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const UserPendingList = ({ user }) => {
  const [saving, setSaving] = useState(false);

  const activateUser = async () => {
    setSaving(true);
    try {
      const response = await api.put(`/users/activate/${user._id}`);
      if (response.status === 200) {
        toast.success("User telah aktif");
        console.log("User activated:", response.data);
        window.location.reload(); // Reload the page to reflect changes
      }
    } catch (error) {
      toast.error("Gagal mengaktivasi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <li className="flex items-center p-4 border-b border-base-content">
      <div className="grow">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-base-content/50">{user.nim}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn btn-sm btn-success" onClick={activateUser} disabled={saving}>
          {saving ? <span className="loading loading-spinner"></span> : "Aktifkan"}
        </button>
      </div>
    </li>
  );
};

export default UserPendingList;
