import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import PrivateRoute from "../components/PrivateRoute.jsx";
import api from "../lib/axios.js";
import { getUserRole } from "../lib/auth.js";
import TaskCard from "../components/TaskCard.jsx";

const TasksPage = () => {
  const token = localStorage.getItem("token");
  const userRole = getUserRole();
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
        console.log("Tasks fetched successfully:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
          toast.error("You have exceeded the rate limit. Please try again later.");
        } else {
          toast.error("Failed to fetch tasks. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <PrivateRoute allowedRoles={["superadmin", "admin", "user"]}>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold mb-4">Tugas</h1>
        {userRole !== "user" && (
          <Link to="/add-task" className="btn btn-primary mb-4">
            <Plus /> Tambah
          </Link>
        )}
      </div>
      {isRateLimited && toast.error("You have exceeded the rate limit. Please try again later.")}
      {loading && <p>Loading tasks...</p>}

      {tasks.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </PrivateRoute>
  );
};

export default TasksPage;
