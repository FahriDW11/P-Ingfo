import { Link, useLocation } from "react-router";
import { House, BookOpenCheck, Settings, Menu, ClipboardCheck } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <House size={24} />, url: "/" },
    { name: "Presensi", icon: <ClipboardCheck size={24} />, url: "/presensi" },
    { name: "Tugas", icon: <BookOpenCheck size={24} />, url: "/tugas" },
    { name: "Settings", icon: <Settings size={24} />, url: "/settings" },
  ];

  return (
    <div className={`bg-base-100 text-base-content rounded-xl h-screen transition-all duration-300 w-20 flex-col md:flex hidden`}>
      {/* Top Section */}
      <div className={`flex items-center p-4 justify-center`}>
        <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <Menu />
        </label>
      </div>

      {/* Menu List */}
      <div className="overflow-y-auto grow">
        <ul className="flex-1 space-y-2 px-2 pb-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.name} className={`w-full tooltip tooltip-bottom`} data-tip={item.name}>
                <Link
                  to={item.url}
                  className={`flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors
                    ${isActive ? "bg-neutral text-neutral-content" : "hover:bg-neutral/15"}
                    justify-center px-3`}
                >
                  <span className="block">{item.icon}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
