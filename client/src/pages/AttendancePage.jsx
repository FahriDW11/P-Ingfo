import React from "react";
import PrivateRoute from "../components/PrivateRoute";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { getUserRole } from "../lib/auth.js";
import { useState, useEffect } from "react";

const AttendancePage = () => {
  const userRole = getUserRole();
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <PrivateRoute allowedRoles={["user", "admin", "superadmin"]}>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold mb-4">Presensi</h1>
        {userRole !== "user" && (
          <Link to="/buat-presensi" className="btn btn-primary mb-4">
            <Plus /> Buat
          </Link>
        )}
      </div>
      {isRateLimited && toast.error("Terlalu banyak request..zzzz..")}
      {loading && (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Memuat Presensi...</p>
        </div>
      )}

      {/* {tasks.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )} */}
    </PrivateRoute>
  );
};

export default AttendancePage;
