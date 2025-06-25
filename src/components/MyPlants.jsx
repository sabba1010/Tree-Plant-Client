import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://tree-plant-server.vercel.app/plants')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch plants');
        return res.json();
      })
      .then(data => {
        setPlants(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this plant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://tree-plant-server.vercel.app/plants/${id}`, {
          method: 'DELETE',
        });

        if (!res.ok) throw new Error('Failed to delete plant');

        setPlants(plants.filter(plant => plant._id !== id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The plant has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      }
    }
  };

  if (loading)
    return (
      <p className="text-green-700 p-6 text-center text-xl font-semibold">
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-green-900 text-center">
        My Plants
      </h1>

      {plants.length === 0 ? (
        <p className="text-green-700 text-center text-lg">No plants found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {plants.map((plant) => (
            <div
              key={plant._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {plant.image ? (
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-green-100 flex items-center justify-center text-green-400 font-semibold">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  {plant.plantName}
                </h2>
                <p className="text-green-600 capitalize mb-1">
                  <span className="font-semibold">Category:</span> {plant.category}
                </p>
                <p className="text-green-600 mb-4">
                  <span className="font-semibold">Watering:</span> {plant.wateringFrequency}
                </p>

                {/* Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/plants/${plant._id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/updatePlants/${plant._id}`}
                    className="inline-block px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(plant._id)}
                    className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
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

