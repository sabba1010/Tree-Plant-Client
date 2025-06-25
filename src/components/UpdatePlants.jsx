import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdatePlants = () => {
  const {
    _id,
    image,
    plantName,
    category,
    description,
    careLevel,
    wateringFrequency,
    lastWateredDate,
    nextWateringDate,
    healthStatus,
  } = useLoaderData();

  const navigate = useNavigate();

  const handleUpdatePlants = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedPlant = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://tree-plant-server.vercel.app/plants/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlant),
      });

      if (!response.ok) {
        throw new Error('Failed to update plant');
      }

      const data = await response.json();
      console.log('Update success:', data);

      Swal.fire({
        icon: 'success',
        title: 'Plant Updated!',
        text: 'The plant information was successfully updated.',
        confirmButtonColor: '#22c55e',
      }).then(() => {
        navigate('/my-plants'); // ✅ Navigate to my-plants page
      });

    } catch (error) {
      console.error('Error updating plant:', error);

      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const fields = [
    {
      label: "Image URL",
      name: "image",
      type: "text",
      placeholder: "Enter image URL",
      required: false,
      defaultValue: image || "",
    },
    {
      label: "Plant Name",
      name: "plantName",
      type: "text",
      placeholder: "Enter plant name",
      required: true,
      defaultValue: plantName || "",
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      options: ["succulent", "fern", "flowering", "herb", "cactus"],
      required: true,
      defaultValue: category || "",
    },
    {
      label: "Care Level",
      name: "careLevel",
      type: "select",
      options: ["easy", "moderate", "difficult"],
      required: true,
      defaultValue: careLevel || "",
    },
    {
      label: "Watering Frequency",
      name: "wateringFrequency",
      type: "text",
      placeholder: "e.g., every 3 days",
      required: false,
      defaultValue: wateringFrequency || "",
    },
    {
      label: "Last Watered Date",
      name: "lastWateredDate",
      type: "date",
      required: false,
      defaultValue: lastWateredDate ? lastWateredDate.split("T")[0] : "",
    },
    {
      label: "Next Watering Date",
      name: "nextWateringDate",
      type: "date",
      required: false,
      defaultValue: nextWateringDate ? nextWateringDate.split("T")[0] : "",
    },
    {
      label: "Health Status",
      name: "healthStatus",
      type: "text",
      placeholder: "e.g., Healthy, Wilting",
      required: false,
      defaultValue: healthStatus || "",
    },
  ];

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 bg-green-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 md:p-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
          🌱 Update Plant
        </h2>

        <form onSubmit={handleUpdatePlants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  defaultValue={field.defaultValue}
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select {field.label}</option>
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
                  defaultValue={field.defaultValue}
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Write a short description..."
              defaultValue={description || ""}
              className="w-full px-4 py-3 border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition"
            >
              Update Plant 🌿
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlants;
