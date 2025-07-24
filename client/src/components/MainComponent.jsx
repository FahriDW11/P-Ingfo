import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainComponent = () => {
  return (
    <div className="bg-base-200 px-1 md:px-8 ">
      <Navbar />
      <div className="flex gap-2 h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-base-100 rounded-xl overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
