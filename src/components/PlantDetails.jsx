import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { format } from 'date-fns'; // date formatting library

const PlantDetails = () => {
  const plant = useLoaderData();
  const {
    image,
    plantName,
    category,
    description,
    careLevel,
    wateringFrequency,
    lastWateredDate,
    nextWateringDate,
    healthStatus,
    userEmail,
    userName,
  } = plant;

  // Format dates
  const formattedLastWatered = lastWateredDate
    ? format(new Date(lastWateredDate), 'MMMM dd, yyyy')
    : 'N/A';

  const formattedNextWatering = nextWateringDate
    ? format(new Date(nextWateringDate), 'MMMM dd, yyyy')
    : 'N/A';

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-xl p-6 sm:p-10">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-8">
          🌱 {plantName}
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Plant Image */}
          <div className="lg:w-1/2 w-full">
            <img
              src={image}
              alt={plantName}
              className="rounded-2xl border border-green-300 shadow-lg w-full object-cover"
            />
          </div>

          {/* Plant Info */}
          <div className="lg:w-1/2 w-full space-y-4 text-green-900 text-lg">
            <p><span className="font-semibold">🌿 Category:</span> {category}</p>
            <p><span className="font-semibold">💧 Watering Frequency:</span> Every {wateringFrequency} days</p>
            <p><span className="font-semibold">🧩 Care Level:</span> {careLevel?.charAt(0).toUpperCase() + careLevel?.slice(1)}</p>
            <p><span className="font-semibold">📅 Last Watered:</span> {formattedLastWatered}</p>
            <p><span className="font-semibold">⏭️ Next Watering:</span> {formattedNextWatering}</p>
            <p><span className="font-semibold">💚 Health Status:</span> {healthStatus}</p>
            <p><span className="font-semibold">👤 Added By:</span> {userName} <span className="text-sm text-green-700">({userEmail})</span></p>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-green-800 mb-3">📝 Description</h3>
            <p className="bg-white p-5 rounded-xl shadow-inner text-green-800 leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetails;
