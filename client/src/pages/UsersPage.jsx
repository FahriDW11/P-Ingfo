import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import api from "../lib/axios.js";
import { getUserRole } from "../lib/auth.js";
import UserTable from "../components/UserTable.jsx";

const UsersPage = () => {
  const token = localStorage.getItem("token");
  const userRole = getUserRole();
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        console.log("Users fetched successfully:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
          toast.error("You have exceeded the rate limit. Please try again later.");
        } else {
          toast.error("Failed to fetch users. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold mb-4">Daftar User</h1>
        {userRole === "superadmin" && (
          <Link to="/add-user" className="btn btn-primary mb-4">
            <Plus />
          </Link>
        )}
      </div>
      {isRateLimited && toast.error("You have exceeded the rate limit. Please try again later.")}
      {loading && (
        <div>
          <span className="loading loading-spinner"></span>Memuat data user
        </div>
      )}

      {users.length > 0 && !isRateLimited && (
        <ul>
          {users.map((user) => (
            <UserTable key={user._id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
