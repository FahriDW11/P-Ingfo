import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../lib/axios.js";

export const AddTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/tasks", {
        title,
        description,
        subject,
        isGroup,
        deadline: new Date(deadline),
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Gagal buat tugas! hayolooh error!");
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
      setSubject("");
      setIsGroup(false);
      setDeadline("");
    }
  };

  return (
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
  );
};

export default AddTaskPage;
