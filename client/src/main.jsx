import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

const storedTheme = localStorage.getItem("theme");
const prefersTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const theme = storedTheme || prefersTheme;
document.documentElement.setAttribute("data-theme", theme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </StrictMode>
);
