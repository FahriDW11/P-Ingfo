import { Routes, Route } from "react-router";

import PrivateRoute from "./components/PrivateRoute.jsx";
import MainComponent from "./components/MainComponent.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import AddTaskPage from "./pages/AddTaskPage.jsx";
import TaskDetailPage from "./pages/TaskDetailPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<MainComponent />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
        <Route
          path="/users"
          element={
            <PrivateRoute allowedRoles={["superadmin", "user"]}>
              <UsersPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
