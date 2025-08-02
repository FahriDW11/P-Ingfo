import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import PrivateRoute from "../components/PrivateRoute.jsx";
import api from "../lib/axios.js";
import UserPendingList from "../components/UserPendingList.jsx";

const PendingUsersPage = () => {
  const token = localStorage.getItem("token");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/users/pending", {
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
    <PrivateRoute allowedRoles={["superadmin", "admin"]}>
      <div className="flex justify-between mb-4">
        <Link to={"/users"}>
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold mb-4">Daftar User Pending</h1>
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
            <UserPendingList key={user._id} user={user} />
          ))}
        </ul>
      )}
    </PrivateRoute>
  );
};

export default PendingUsersPage;
