import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="text-center max-w-lg">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="Lost plant"
          className="w-40 mx-auto mb-6 opacity-80"
        />
        <h1 className="text-6xl md:text-8xl font-extrabold text-green-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-green-700 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg font-medium shadow-md hover:bg-green-800 transition duration-300"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
 






