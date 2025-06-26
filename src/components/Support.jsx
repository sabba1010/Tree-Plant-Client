import React, { useState } from "react";
import Swal from "sweetalert2";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const issueOptions = [
    { value: "", label: "Select issue type" },
    { value: "bug", label: "🐞 Bug Report" },
    { value: "feature", label: "✨ Feature Request" },
    { value: "account", label: "👤 Account Issue" },
    { value: "other", label: "❓ Other" },
  ];

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
    if (!formData.issueType) errs.issueType = "Please select an issue type";
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) errs.message = "Message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "<strong>Support Request Sent!</strong>",
      icon: "success",
      html:
        `<p>Thank you <b>${formData.name}</b>!<br/>` +
        "Our support team will get back to you shortly.</p>",
      timer: 3500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        // You can do something here if needed when alert closes
      },
    });

    setFormData({
      name: "",
      email: "",
      issueType: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md my-12 text-green-900">
      <h1 className="text-3xl font-bold mb-4 text-center">Support</h1>
      <p className="mb-6 text-center text-green-700">
        Please fill out the form below with details about your issue or request.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
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

        {/* Email */}
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

        {/* Issue Type */}
        <div className="mb-4">
          <label htmlFor="issueType" className="block mb-1 font-semibold">
            Issue Type
          </label>
          <select
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.issueType ? "border-red-500" : "border-green-300"
            }`}
            aria-invalid={errors.issueType ? "true" : "false"}
            aria-describedby="issueType-error"
          >
            {issueOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.issueType && (
            <p id="issueType-error" className="text-red-600 mt-1 text-sm">
              {errors.issueType}
            </p>
          )}
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-1 font-semibold">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.subject ? "border-red-500" : "border-green-300"
            }`}
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby="subject-error"
          />
          {errors.subject && (
            <p id="subject-error" className="text-red-600 mt-1 text-sm">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
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
          Submit Support Request
        </button>
      </form>
    </section>
  );
};

export default Support;
