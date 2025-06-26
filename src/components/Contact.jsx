import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errs.email = "Invalid email address";
    }
    if (!formData.message.trim()) errs.message = "Message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Simulate submission success
    setSuccess("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });

    // Show SweetAlert success popup
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon.",
      timer: 3000,
      showConfirmButton: false,
    });

    // TODO: integrate backend/email service
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md my-12 text-green-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.name ? "border-red-500" : "border-green-300"
            }`}
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="text-red-600 mt-1 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? "border-red-500" : "border-green-300"
            }`}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 mt-1 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-1 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.message ? "border-red-500" : "border-green-300"
            }`}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby="message-error"
          ></textarea>
          {errors.message && (
            <p id="message-error" className="text-red-600 mt-1 text-sm">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded transition focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          Send Message
        </button>

        {success && (
          <p className="mt-4 text-green-700 font-semibold text-center">{success}</p>
        )}
      </form>
    </section>
  );
};

export default Contact;
