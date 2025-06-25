import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUpperCase && hasLowerCase && isLongEnough;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text:
          "Password must be at least 6 characters long and contain uppercase and lowercase letters.",
        background: "#9f1239",
        color: "#fff",
        confirmButtonColor: "#10b981",
      });
      return;
    }

    try {
      await createUser(formData.email, formData.password);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
        background: "#047857",
        color: "#fff",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
        background: "#9f1239",
        color: "#fff",
        confirmButtonColor: "#10b981",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-blue-900 p-6">
      <div className="max-w-md w-full bg-transparent rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-md bg-transparent border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-md bg-transparent border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL (optional)"
            value={formData.photoURL}
            onChange={handleChange}
            className="input input-bordered w-full rounded-md bg-transparent border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-md bg-transparent border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="btn btn-primary w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
