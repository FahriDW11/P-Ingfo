import toast from "react-hot-toast";
import { SquareUser } from "lucide-react";

import PrivateRoute from "../components/PrivateRoute.jsx";
import { getUserData } from "../lib/auth.js";

const HomePage = () => {
  const userData = getUserData();
  return (
    <PrivateRoute allowedRoles={["admin", "user", "superadmin"]}>
      <div>
        <h1 className="text-3xl font-bold mb-4">HI, {userData.name}</h1>
        <div className="stats stats-vertical lg:stats-horizontal shadow-sm shadow-primary mx-auto">
          <div className="stat">
            <div className="stat-figure text-primary">
              <SquareUser size={50} />
            </div>
            <div className="stat-title">Role</div>
            <div className="stat-value text-primary">{userData.role.toUpperCase()}</div>
            <div className="stat-desc">{userData.role === "user" ? "Bro jadi NPC" : "Salam Atmin"}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <SquareUser size={50} />
            </div>
            <div className="stat-title">Tugas Deadline Minggu Ini</div>
            <div className="stat-value text-secondary">{userData.role.toUpperCase()}</div>
            <div className="stat-desc">{userData.role === "user" ? "Bro jadi NPC" : "Salam Atmin"}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-info">
              <SquareUser size={50} />
            </div>
            <div className="stat-title">Role</div>
            <div className="stat-value text-info">{userData.role.toUpperCase()}</div>
            <div className="stat-desc">{userData.role === "user" ? "Bro jadi NPC" : "Salam Atmin"}</div>
          </div>
        </div>

        {/* untuk informasi */}
        <div>
          <h2 className="text-2xl font-semibold mt-6">Informasi</h2>
          <p className="mt-2">Selamat datang di halaman utama! Di sini Anda dapat melihat informasi terkait tugas dan peran Anda. Pastikan untuk selalu memeriksa tugas yang harus diselesaikan.</p>
        </div>
        {/* <button
          onClick={() => {
            toast.success("Ini adalah notifikasi sukses!");
          }}
          className="btn btn-primary mt-4"
        >
          Tampilkan Notifikasi
        </button>
        <button
          onClick={() => {
            let theme = localStorage.getItem("theme") || "light";
            document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
            localStorage.setItem("theme", theme === "light" ? "dark" : "light");
            toast.success(`Tema telah diubah ke ${theme === "light" ? "gelap" : "terang"}!`);
          }}
          className="btn btn-secondary mt-4 ml-2"
        >
          Toggle Theme dark
        </button>
        <button
          onClick={() => {
            let theme = localStorage.getItem("theme") || "valentine";
            document.documentElement.setAttribute("data-theme", theme === "valentine" ? "light" : "valentine");
            localStorage.setItem("theme", theme === "valentine" ? "light" : "valentine");
            toast.success(`Tema telah diubah ke ${theme === "valentine" ? "terang" : "valentine"}!`);
          }}
        >
          switch to Valentine
        </button> */}
      </div>
    </PrivateRoute>
  );
};

export default HomePage;
