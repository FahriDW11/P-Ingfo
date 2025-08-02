import React from "react";

import { Link, useLocation } from "react-router";
import { House, BookOpenCheck, Settings, Menu, X } from "lucide-react";

const Drawer = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Home", icon: <House size={24} />, url: "/" },
    { name: "Tugas", icon: <BookOpenCheck size={24} />, url: "/tasks" },
    { name: "Settings", icon: <Settings size={24} />, url: "/settings" },
  ];

  return (
    <div className={`bg-base-100 text-base-content rounded-xl h-screen transition-all duration-300 w-64 flex-col flex fixed`}>
      {/* Top Section */}
      <div className={`flex items-center p-4 justify-between`}>
        <h2 className="font-bold text-xl">P-Ingfo</h2>
        <label htmlFor="my-drawer" aria-label="close sidebar" className="btn btn-square btn-ghost">
          <X size={28} />
        </label>
      </div>

      {/* Menu List */}
      <div className="overflow-y-auto grow">
        <ul className="flex-1 space-y-2 px-2 pb-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.name} className={`w-full`}>
                <Link
                  to={item.url}
                  className={`flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors
                    ${isActive ? "bg-neutral text-neutral-content" : "hover:bg-neutral/15"}`}
                >
                  <span className="block">{item.icon}</span>
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
