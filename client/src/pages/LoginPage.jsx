import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={"flex items-center justify-center h-screen bg-base-200"}>
      <div className="w-full max-w-md p-6 bg-base-100 rounded-lg shadow-md text-base-content">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="space-y-4">
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
              <input placeholder="Password here" type={passwordVisible ? "text" : "password"} id="password" onChange={(e) => setPassword(e.target.value)} className="grow" required />
              <input id={"isVisible"} value={passwordVisible} onChange={() => setPasswordVisible(!passwordVisible)} type="checkbox" className={"hidden peer"} />
              <label htmlFor="isVisible" className="cursor-pointer">
                {passwordVisible ? <Eye /> : <EyeClosed />}
              </label>
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
