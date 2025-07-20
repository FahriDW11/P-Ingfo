import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { House, BookOpenCheck, Settings, Menu, X } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const menuItems = [
    { name: "Home", icon: <House size={24} />, url: "/" },
    { name: "Tugas", icon: <BookOpenCheck size={24} />, url: "/tasks" },
    { name: "Settings", icon: <Settings size={24} />, url: "/settings" },
  ];

  return (
    <div
      className={`transition-all duration-300 h-full
      ${isExpanded ? "w-64" : "w-20"} flex flex-col`}
    >
      <div className="bg-base-100 text-base-content h-full rounded-xl">
        {/* Top Section */}
        <div className={`flex items-center p-4 ${isExpanded ? "justify-between" : "justify-center"}`}>
          {isExpanded && <h2 className="font-bold text-xl">Menu</h2>}
          <button onClick={toggleSidebar}>{isExpanded ? <X size={28} /> : <Menu size={28} />}</button>
        </div>

        {/* Menu List */}
        <ul className="flex-1 space-y-2 px-2 pb-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.name} className={`w-full ${!isExpanded ? "tooltip tooltip-bottom" : ""}`} data-tip={item.name}>
                <Link
                  to={item.url}
                  className={`flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors
                  ${isActive ? "bg-neutral text-neutral-content" : "hover:bg-neutral/15"}
                  ${!isExpanded ? "justify-center px-3" : ""}`}
                >
                  <span className="block">{item.icon}</span>
                  {isExpanded && <span className="whitespace-nowrap">{item.name}</span>}
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
