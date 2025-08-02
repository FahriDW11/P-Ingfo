import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import PrivateRoute from "../components/PrivateRoute.jsx";
import api from "../lib/axios";
import { formatDate, countdownToDate } from "../lib/utils.js";

const TaskDetailPage = () => {
  const token = localStorage.getItem("token");
  const [task, setTask] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await api.get(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setTask(response.data);
        console.log("Task details fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    fetchTaskDetails();
  }, []);

  return (
    <PrivateRoute allowedRoles={["superadmin", "admin", "user"]}>
      <div className="flex gap-4 items-center mb-4">
        <Link to="/tasks" className="btn btn-ghost">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Detail Tugas</h1>
      </div>
      <div className="bg-base-100 py-6 px-2 lg:px-10 rounded-lg border border-base-300">
        <div className="mb-10">
          <h2 className="text-xl mb-1 font-semibold">{task.title}</h2>
          <p className="mb-3 text-base-content/50">{task.description}</p>
          <p className="text-sm mb-1 text-base-content/50">Mata Kuliah: {task.subject}</p>
          <p className="text-sm mb-1 text-base-content/50">Tipe Tugas: {task.isGroup ? "Kelompok" : "Individu"}</p>
          <p className="text-sm mb-1 text-base-content/50">Deadline: {formatDate(task.deadline)}</p>
          <p className="text-sm mb-1 text-base-content/50">Time Remaining: {countdownToDate(new Date(task.deadline))}</p>
        </div>
        <div>
          <button className="btn btn-secondary mr-2">Edit</button>
          <button className="btn btn-error mr-2">Hapus</button>
          <button className="btn btn-primary">Selesai</button>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default TaskDetailPage;
