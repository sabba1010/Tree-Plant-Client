import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashbord = () => {
  const activeLink = "font-semibold text-green-900 underline";
  const normalLink = "hover:text-green-800";

  return (
    <div className="md:flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-green-100 md:w-64 w-full p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-green-800">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            🏠 Overview
          </NavLink>
          <NavLink to="/dashboard/add-plant" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            ➕ Add Plant
          </NavLink>
          <NavLink to="/dashboard/all-plants" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            🌱 All Plants
          </NavLink>
          <NavLink to="/dashboard/my-plants" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            🪴 My Plants
          </NavLink>
          <NavLink to="/dashboard/Seasonal-Plant-Care-Tips" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            ☀️ Plant Care Tips
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashbord;
