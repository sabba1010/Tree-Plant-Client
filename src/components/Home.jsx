import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const Home = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('https://tree-plant-server.vercel.app/plants')
      .then(res => res.json())
      .then(data => setPlants(data.slice(0, 6))); // Only 6 new plants
  }, []);

  return (
    <div className="space-y-16">
      
      {/* Banner/Slider */}
     <div className="w-full">
<Swiper
  className="h-[300px] md:h-[500px] rounded-2xl shadow-xl"
  loop={true}
  autoplay={{ delay: 3000 }}
  spaceBetween={30}
  pagination={{ clickable: true }}
  navigation={true}  // ← arrows enable
>
  {/* Slide 1 */}
  <SwiperSlide className="relative">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnwjx8juzYSYi_5g7ZU2O9tbC8Iu8ReBjXyg&s"
      alt="Plant Care"
      className="w-full h-full object-cover rounded-2xl"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-green-500/30 flex flex-col items-center justify-center text-center p-6 rounded-2xl transition-all duration-500 ease-in-out">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md animate-fadeIn">
        Nurture Your Trees Like a Pro
      </h2>
      <p className="mt-4 text-white text-lg animate-fadeIn delay-150">
        Understand watering cycles, sunlight needs, and soil care for thriving trees.
      </p>
    </div>
  </SwiperSlide>

  {/* Slide 2 */}
  <SwiperSlide className="relative">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOz8qvOZ0WV0v30O2SkJU7qCOlNm5QbB6bHg&s"
      alt="Plant Varieties"
      className="w-full h-full object-cover rounded-2xl"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-green-400/30 flex flex-col items-center justify-center text-center p-6 rounded-2xl">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white animate-fadeIn">
        Discover Rare & Native Tree Species
      </h2>
      <p className="mt-4 text-white text-lg animate-fadeIn delay-150">
        Explore the diversity of local trees and their unique benefits for your garden.
      </p>
    </div>
  </SwiperSlide>

  {/* Slide 3 */}
  <SwiperSlide className="relative">
    <img
      src="https://www.undp.org/sites/g/files/zskgke326/files/migration/bd/117241365_10158627712927433_464094589491961361_o.jpg"
      alt="Track Plants"
      className="w-full h-full object-cover rounded-2xl"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-green-800/70 to-green-300/20 flex flex-col items-center justify-center text-center p-6 rounded-2xl">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white animate-fadeIn">
        Keep Track of Your Trees’ Growth
      </h2>
      <p className="mt-4 text-white text-lg animate-fadeIn delay-150">
        Use our app to monitor watering, pruning, and overall health for a lush green space.
      </p>
    </div>
  </SwiperSlide>
</Swiper>

</div>


      {/* New Plants Section */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-900">New Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plants.map(plant => (
            <div key={plant._id} className="bg-white shadow-md rounded-lg p-4 border border-green-200">
              <img src={plant.image} alt={plant.plantName} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold text-green-800">{plant.plantName}</h3>
              <p className="text-sm text-green-600 capitalize">{plant.category}</p>
              <Link to={`/plants/${plant._id}`} className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Top Plant Care Mistakes Section */}
    
<section className="bg-green-50 py-12 px-4">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6 text-green-900">Essential Plant Care Tips</h2>
    <ul className="text-green-800 space-y-2 text-left list-disc list-inside">
      <li>Water your plants consistently but avoid waterlogging</li>
      <li>Place plants according to their light requirements</li>
      <li>Use nutrient-rich potting soil suitable for your plant type</li>
      <li>Prune dead or yellowing leaves regularly</li>
      <li>Repot plants when they outgrow their containers</li>
      <li>Feed your plants with appropriate fertilizer during growing season</li>
      <li>Keep an eye out for pests and treat them early</li>
    </ul>
  </div>
</section>

      {/* Beginner-Friendly Plants Section */}
  <section className="py-12 px-4">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6 text-green-900">
      🌱 Seasonal Plant Care Tips
    </h2>
    <p className="text-green-700 mb-6">
      Keep your plants happy all year round with these easy care tips:
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-green-800 mb-8">
      <div className="bg-green-100 p-4 rounded-lg">🌸 Spring: Repot & increase watering</div>
      <div className="bg-green-100 p-4 rounded-lg">☀️ Summer: Provide shade & more water</div>
      <div className="bg-green-100 p-4 rounded-lg">🍂 Autumn: Reduce watering & remove dead leaves</div>
    </div>

    <a
      href="Seasonal-Plant-Care-Tips"
      className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 transition duration-300"
    >
      View More
    </a>
  </div>
</section>


    </div>
  );
};

export default Home;
