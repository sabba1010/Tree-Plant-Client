import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-green-800 py-8 mt-10">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Website Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Tree Plants BD</h2>
          <p className="text-sm">Bringing nature closer to your home, one plant at a time.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-medium underline text-green-700" : "hover:underline"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-plants"
                className={({ isActive }) =>
                  isActive ? "font-medium underline text-green-700" : "hover:underline"
                }
              >
                All Plants
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-plant"
                className={({ isActive }) =>
                  isActive ? "font-medium underline text-green-700" : "hover:underline"
                }
              >
                Add Plant
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-plants"
                className={({ isActive }) =>
                  isActive ? "font-medium underline text-green-700" : "hover:underline"
                }
              >
                My Plants
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: support@treeplantsbd.com</p>
          <p className="text-sm mb-2">Phone: +880 1234 567890</p>
          <div className="flex justify-center md:justify-start gap-4 mt-2 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-green-600">
        &copy; {new Date().getFullYear()} Tree Plants BD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
