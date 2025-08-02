import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Drawer from "./Drawer";

const MainComponent = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {/* content */}
      <div className="flex drawer-content bg-base-200">
        <Sidebar />
        <div className="flex-1 gap-2 h-screen px-1 md:px-2 pb-2 overflow-y-auto">
          <Navbar />
          <div className="p-6 bg-base-100 rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>

      {/* drawer-side */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <Drawer />
      </div>
    </div>
  );
};

export default MainComponent;
