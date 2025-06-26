


import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const activeClass = "font-semibold underline text-green-900";
  const defaultClass = "px-3 py-2 hover:text-green-800";

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="bg-green-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-2xl font-bold text-green-900">
        GreenLeaf Plant Care
        </Link>

        <button
          className="md:hidden text-green-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div
          className={`flex-col md:flex md:flex-row md:items-center md:gap-4 w-full md:w-auto bg-white md:bg-transparent absolute md:static top-full left-0 md:top-auto md:left-auto border md:border-0 rounded-b-md md:rounded-none shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden"
          } md:max-h-full`}
        >
          <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? activeClass : defaultClass)}>
            Home
          </NavLink>
          <NavLink to="/all-plants" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? activeClass : defaultClass)}>
            All Plants
          </NavLink>
         
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? activeClass : defaultClass)}>
            About Us
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? activeClass : defaultClass)}>
            Contact
          </NavLink>
          <NavLink to="/support" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? activeClass : defaultClass)}>
            Support
          </NavLink>
           <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? activeClass : defaultClass)}>
           Dashboard
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4 text-green-900">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {user.photoURL && <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full" />}
              <button onClick={handleLogout} className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col px-4 pb-4 md:hidden gap-2 text-green-900 border-t border-green-300">
          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:underline">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="hover:underline">Register</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {user.photoURL && <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full" />}
              <button onClick={handleLogout} className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800">
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
