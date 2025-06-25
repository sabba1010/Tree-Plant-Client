import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-900 px-4">
      <h1 className="text-9xl font-extrabold mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-6">
        Oops! Page Not Found
      </p>
      <p className="mb-8 max-w-md text-center text-green-700">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition"
      >
        Go to Home
      </Link>
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="Lost plant"
        className="mt-10 w-48 opacity-70"
      />
    </div>
  );
};

export default NotFound;
