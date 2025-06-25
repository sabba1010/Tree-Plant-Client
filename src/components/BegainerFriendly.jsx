import React from 'react';

const BeginnerFriendly = () => {
  const seasonalTips = [
    {
      season: "Spring 🌸",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      description: "Time to repot your plants and increase watering as they start to grow faster.",
    },
    {
      season: "Summer ☀️",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      description: "Provide shade for sensitive plants and increase watering to keep soil moist.",
    },
    {
      season: "Autumn 🍂",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      description: "Reduce watering gradually and remove dead leaves to prepare plants for dormancy.",
    },
    {
      season: "Winter ❄️",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      description: "Keep plants away from cold drafts and reduce watering; most plants rest during this season.",
    },
    {
      season: "All Year 🌿",
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e",
      description: "Keep an eye out for pests and regularly clean dust from leaves for optimal photosynthesis.",
    },
    {
      season: "Fertilizing Tips 🧴",
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      description: "Use a balanced fertilizer during the growing season to keep plants healthy and vibrant.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-green-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-900">🌱 Seasonal Plant Care Tips</h2>
        <p className="text-green-700 mb-10 text-lg">
          Follow these tips to keep your plants healthy throughout the year!
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {seasonalTips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={tip.image + "?auto=format&fit=crop&w=600&q=80"}
                alt={tip.season}
                className="w-full h-52 object-cover"
              />
              <div className="p-5 text-left space-y-2">
                <h3 className="text-2xl font-semibold text-green-800">{tip.season}</h3>
                <p className="text-green-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeginnerFriendly;
