import { Routes, Route, Outlet } from "react-router";

import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import AddTaskPage from "./pages/AddTaskPage.jsx";
import TaskDetailPage from "./pages/TaskDetailPage.jsx";

const App = () => {
  // Set the theme based on localStorage or default to light
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      <Route
        element={
          <div className="bg-base-200 px-8">
            <Navbar />
            <div className="flex gap-2 h-screen">
              <Sidebar />
              <div className="flex-1 p-6 bg-base-100 rounded-xl overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
      </Route>
    </Routes>
  );
};

export default App;
