import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import api from "../lib/axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      if (!!response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login berhasil");
        navigate("/");
      } else {
        toast.error("Login gagal, silakan coba lagi");
      }
    } catch (error) {
      toast.error("Tidak Bisa Memuat");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"flex items-center justify-center h-screen bg-base-200"}>
      <div className="w-full max-w-md p-6 bg-base-100 rounded-lg shadow-md text-base-content">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input placeholder="NIM untuk username" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              <span className="">Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input placeholder="********" type={passwordVisible ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="grow" required />
              <input id={"isVisible"} value={passwordVisible} onChange={() => setPasswordVisible(!passwordVisible)} type="checkbox" className={"hidden peer"} />
              <label htmlFor="isVisible" className="cursor-pointer">
                {passwordVisible ? <Eye /> : <EyeClosed />}
              </label>
            </label>
          </div>
          <button type="submit" className={`btn btn-primary w-full`}>
            <span className={`${loading ? "loading loading-spinner" : ""}`}></span>
            {loading ? "Tunggu..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
