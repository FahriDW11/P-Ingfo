import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../lib/axios.js";
import PrivateRoute from "../components/PrivateRoute.jsx";

export const AddTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [deadline, setDeadline] = useState("");

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    const navigate = useNavigate();
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(
        "/tasks",
        {
          title,
          description,
          subject,
          isGroup,
          deadline: new Date(deadline),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Berhasil Menambahkan Tugas");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
        toast.error("You have exceeded the rate limit. Please try again later.");
      } else {
        console.error("Error adding task:", error);
        toast.error("Hayoloh Error, *emote batu");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute allowedRoles={["admin", "superadmin"]}>
      {isRateLimited && toast.error("Kebanyakan Request, Sabar ege...")}
      <div>
        <div className="flex gap-4 items-center mb-4">
          <Link to="/tasks" className="btn btn-ghost">
            <ArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold mb-4">Tambah Tugas</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Judul Tugas</span>
            </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Deskripsi</span>
            </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Subjek</span>
            </label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="input input-bordered w-full" required />
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Tugas Kelompok?</span>
              <input type="checkbox" checked={isGroup} onChange={(e) => setIsGroup(e.target.checked)} className="toggle toggle-primary ml-2" />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Batas Waktu</span>
            </label>
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input input-bordered w-full" required />
          </div>
          <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`}>
            {loading ? "Membuat..." : "Buat Tugas"}
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default AddTaskPage;
