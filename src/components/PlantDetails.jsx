import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';

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

  const formattedLastWatered = lastWateredDate
    ? format(new Date(lastWateredDate), 'MMMM dd, yyyy')
    : 'N/A';

  const formattedNextWatering = nextWateringDate
    ? format(new Date(nextWateringDate), 'MMMM dd, yyyy')
    : 'N/A';

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 md:p-10 shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">
          🌱 {plantName}
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={image}
              alt={plantName}
              className="w-full h-auto max-h-[400px] object-cover rounded-xl border border-green-200 shadow-sm"
            />
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 space-y-4 text-green-900 text-base md:text-lg">
            <p><strong>🌿 Category:</strong> {category}</p>
            <p><strong>💧 Watering:</strong> Every {wateringFrequency} days</p>
            <p><strong>🧩 Care Level:</strong> {careLevel?.charAt(0).toUpperCase() + careLevel?.slice(1)}</p>
            <p><strong>📅 Last Watered:</strong> {formattedLastWatered}</p>
            <p><strong>⏭️ Next Watering:</strong> {formattedNextWatering}</p>
            <p><strong>💚 Health Status:</strong> {healthStatus}</p>
            <p>
              <strong>👤 Added By:</strong> {userName}{' '}
              <span className="text-sm text-green-600">({userEmail})</span>
            </p>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-green-800 mb-3">📝 Description</h3>
            <p className="bg-white p-5 rounded-xl text-green-700 leading-relaxed border border-green-100">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetails;
