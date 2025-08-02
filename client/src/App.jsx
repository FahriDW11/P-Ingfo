import { useEffect } from "react";
import { Routes, Route } from "react-router";

import MainComponent from "./components/MainComponent.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import HomePage from "./pages/HomePage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import AddTaskPage from "./pages/AddTaskPage.jsx";
import TaskDetailPage from "./pages/TaskDetailPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import PendingUsersPage from "./pages/PendingUsersPage.jsx";

const App = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = storedTheme || prefersTheme;
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<MainComponent />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/pending" element={<PendingUsersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
