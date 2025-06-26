import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllPlants = () => {
  const loadedPlants = useLoaderData();
  const [plants, setPlants] = useState(loadedPlants || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("");

  // Sort helper function
  const sortPlants = (plantsToSort, option) => {
    if (!option) return plantsToSort;

    const sorted = [...plantsToSort];

    if (option === "nextWateringDate") {
      sorted.sort((a, b) => new Date(a.nextWateringDate) - new Date(b.nextWateringDate));
    } else if (option === "careLevel") {
      const levelOrder = { easy: 1, moderate: 2, difficult: 3 };
      sorted.sort((a, b) => (levelOrder[a.careLevel] || 0) - (levelOrder[b.careLevel] || 0));
    }

    return sorted;
  };

  // Effect to sort plants when sortOption changes
  useEffect(() => {
    setPlants((prevPlants) => sortPlants(prevPlants, sortOption));
  }, [sortOption]);

  const handleDelete = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      setLoading(true);
      const res = await fetch(`https://tree-plant-server.vercel.app/plants/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete plant");

      const data = await res.json();

      if (data.deletedCount) {
        setPlants((current) => current.filter((plant) => plant._id !== _id));
        Swal.fire("Deleted!", "Your plant has been deleted.", "success");
      } else {
        throw new Error("Plant was not deleted");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">All Plants</h2>

      {/* Sort Select */}
      <div className="mb-6 flex justify-end">
        <label htmlFor="sort" className="sr-only">
          Sort Plants
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Sort plants"
          disabled={loading}
        >
          <option value="">Sort By</option>
          <option value="nextWateringDate">Next Watering Date</option>
          <option value="careLevel">Care Level</option>
        </select>
      </div>

      {loading && (
        <p className="text-green-700 text-center font-semibold mb-4 animate-pulse">Processing...</p>
      )}

      {plants.length === 0 ? (
        <p className="text-green-700 text-center text-lg italic">
          No plants found. Add some plants to get started!
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-md">
          <table className="min-w-full border border-green-300 text-green-900">
            <thead className="bg-green-200">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Plant Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Watering Frequency</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant, index) => (
                <tr
                  key={plant._id}
                  className="border-t hover:bg-green-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{plant.plantName}</td>
                  <td className="py-3 px-4 capitalize">{plant.category}</td>
                  <td className="py-3 px-4">{plant.wateringFrequency}</td>
                  <td className="py-3 px-4 space-x-2">
                    <Link
                      to={`/plants/${plant._id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      aria-label={`View details for ${plant.plantName}`}
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(plant._id)}
                      disabled={loading}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Remove ${plant.plantName}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPlants;

