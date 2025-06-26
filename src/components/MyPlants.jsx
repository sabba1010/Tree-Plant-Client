import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const MyPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://tree-plant-server.vercel.app/plants")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plants");
        return res.json();
      })
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this plant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://tree-plant-server.vercel.app/plants/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete plant");

        setPlants(plants.filter((plant) => plant._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The plant has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    }
  };

  if (loading)
    return (
      <p className="text-green-700 p-6 text-center text-xl font-semibold animate-pulse">
        Loading plants...
      </p>
    );

  if (error)
    return (
      <p className="text-red-600 p-6 text-center text-lg font-semibold">
        Error: {error}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-green-900 text-center tracking-wide">
        My Plants
      </h1>

      {plants.length === 0 ? (
        <p className="text-green-700 text-center text-lg italic">
          No plants found. 🌿 Add some green friends to your collection!
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {plants.map((plant) => (
            <div
              key={plant._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-[1.03] hover:shadow-xl transition-transform duration-300 flex flex-col"
            >
              {plant.image ? (
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:brightness-90"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-green-100 flex items-center justify-center text-green-400 font-semibold text-lg">
                  No Image
                </div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold text-green-900 mb-3 truncate">
                  {plant.plantName}
                </h2>
                <p className="text-green-700 capitalize mb-1 text-sm sm:text-base">
                  <span className="font-semibold">Category:</span> {plant.category}
                </p>
                <p className="text-green-700 mb-5 text-sm sm:text-base">
                  <span className="font-semibold">Watering:</span> {plant.wateringFrequency}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    to={`/plants/${plant._id}`}
                    className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    aria-label="View Plant"
                  >
                    <FiEye size={18} /> View
                  </Link>

                  <Link
                    to={`/updatePlants/${plant._id}`}
                    className="flex items-center justify-center gap-2 px-5 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    aria-label="Update Plant"
                  >
                    <FiEdit2 size={18} /> Update
                  </Link>

                  <button
                    onClick={() => handleDelete(plant._id)}
                    className="flex items-center justify-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    aria-label="Delete Plant"
                  >
                    <FiTrash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlants;
