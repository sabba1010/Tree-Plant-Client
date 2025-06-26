import React from "react";

const topRatedItems = [
  {
    id: 1,
    title: "Majestic Oak Tree",
    description: "Strong, durable and perfect for large gardens.",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Beautiful Maple",
    description: "A tree with vibrant fall colors, great for parks.",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Elegant Pine",
    description: "Evergreen and perfect for year-round greenery.",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1445820135520-099d429fdb9d?auto=format&fit=crop&w=400&q=80",
  },
];

const TopRatedSection = () => {
  return (
    <section className="max-w-6xl mx-auto my-12 px-6">
      <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
        Top Rated Items
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topRatedItems.map(({ id, title, description, rating, img }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img src={img} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-900">{title}</h3>
              <p className="text-gray-700 mb-4">{description}</p>
              <div className="flex items-center text-green-600 font-semibold">
                <span className="mr-2">⭐ {rating}</span>
                <span className="text-sm text-gray-500">Top Rated</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedSection;
