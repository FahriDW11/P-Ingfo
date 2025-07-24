import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", {
        name,
        nim,
        email,
        phone,
        password,
      });

      toast.success("Pendaftaran berhasil, silahkan tunggu konfirmasi dari admin");
      navigate("/login");
    } catch (error) {
      toast.error("Gagal mendaftar, silakan coba lagi");
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"flex items-center justify-center min-h-screen bg-base-200"}>
      <div className="w-full max-w-md p-6 bg-base-100 rounded-lg shadow-md text-base-content">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* input untuk nama */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nama Lengkap
            </label>
            <input placeholder="JOKO WIDODO" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" required />
          </div>

          {/* input untuk nim */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="nim">
              NIM
            </label>
            <input placeholder="23101140****" type="text" id="nim" value={nim} onChange={(e) => setNim(e.target.value)} className="input input-bordered w-full" required />
          </div>

          {/* input untuk email */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input placeholder="*****@gmail.com" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
          </div>

          {/* input untuk phone */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              No. WA
            </label>
            <input placeholder="23101140****" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-bordered w-full" required />
          </div>

          {/* input untuk password */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              <span>Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input placeholder="********" type={passwordVisible ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="grow" required />
              <input id={"isVisible"} value={passwordVisible} onChange={() => setPasswordVisible(!passwordVisible)} type="checkbox" className={"hidden peer"} />
              <label htmlFor="isVisible" className="cursor-pointer">
                {passwordVisible ? <Eye /> : <EyeClosed />}
              </label>
            </label>
          </div>

          {/* input untuk confirm password */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              <span>Konfirmasi Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input placeholder="********" type={passwordVisible ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="grow" required />
              <input id={"isVisible2"} value={confirmPasswordVisible} onChange={() => setConfirmPasswordVisible(!passwordVisible)} type="checkbox" className={"hidden peer"} />
              <label htmlFor="isVisible2" className="cursor-pointer">
                {passwordVisible ? <Eye /> : <EyeClosed />}
              </label>
            </label>
          </div>

          {/* tombol submit */}
          <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`}>
            {loading ? "Membuat..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
