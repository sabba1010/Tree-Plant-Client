import React from "react";
import Swal from "sweetalert2";

const AddPlants = () => {
  const handleAddPlants = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newPlants = Object.fromEntries(formData.entries());

    fetch("https://tree-plant-server.vercel.app/plants", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPlants),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Plant added successfully!",
            icon: "success",
            confirmButtonText: "Cool!",
          });
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while adding the plant.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 bg-green-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 md:p-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
          🌱 Add a New Plant
        </h2>

        <form
          onSubmit={handleAddPlants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              label: "Image URL",
              name: "image",
              type: "text",
              placeholder: "Enter image URL",
              required: false,
            },
            {
              label: "Plant Name",
              name: "plantName",
              type: "text",
              placeholder: "Enter plant name",
              required: true,
            },
            {
              label: "Category",
              name: "category",
              type: "select",
              options: ["succulent", "fern", "flowering", "herb", "cactus"],
              required: true,
            },
            {
              label: "Care Level",
              name: "careLevel",
              type: "select",
              options: ["easy", "moderate", "difficult"],
              required: true,
            },
            {
              label: "Watering Frequency",
              name: "wateringFrequency",
              type: "text",
              placeholder: "e.g., every 3 days",
              required: false,
            },
            {
              label: "Last Watered Date",
              name: "lastWateredDate",
              type: "date",
              required: false,
            },
            {
              label: "Next Watering Date",
              name: "nextWateringDate",
              type: "date",
              required: false,
            },
            {
              label: "Health Status",
              name: "healthStatus",
              type: "text",
              placeholder: "e.g., Healthy, Wilting",
              required: false,
            },
            {
              label: "User Email",
              name: "userEmail",
              type: "email",
              placeholder: "Enter user email",
              required: true,
            },
            {
              label: "User Name",
              name: "userName",
              type: "text",
              placeholder: "Enter user name",
              required: true,
            },
          ].map((field, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select {field.name}</option>
                  {field.options.map((option, idx) => (
                    <option value={option} key={idx}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>
          ))}

          {/* Description - Full Width */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Write a short description..."
              className="w-full px-4 py-3 border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition"
            >
              Add Plant 🌿
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlants;

