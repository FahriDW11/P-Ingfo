import React from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <p>Selamat datang di halaman utama!</p>
      <button
        onClick={() => {
          toast.success("Ini adalah notifikasi sukses!");
        }}
        className="btn btn-primary mt-4"
      >
        Tampilkan Notifikasi
      </button>
      <button
        onClick={() => {
          let theme = localStorage.getItem("theme") || "light";
          document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
          localStorage.setItem("theme", theme === "light" ? "dark" : "light");
          toast.success(`Tema telah diubah ke ${theme === "light" ? "gelap" : "terang"}!`);
        }}
        className="btn btn-secondary mt-4 ml-2"
      >
        Toggle Theme dark
      </button>
      <button
        onClick={() => {
          let theme = localStorage.getItem("theme") || "valentine";
          document.documentElement.setAttribute("data-theme", theme === "valentine" ? "light" : "valentine");
          localStorage.setItem("theme", theme === "valentine" ? "light" : "valentine");
          toast.success(`Tema telah diubah ke ${theme === "valentine" ? "terang" : "valentine"}!`);
        }}
      >
        switch to Valentine
      </button>
    </>
  );
};

export default HomePage;
