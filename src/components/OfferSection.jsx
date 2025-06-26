import React from "react";

const OfferSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-400 via-green-600 to-green-900 text-white py-12 px-6 rounded-lg max-w-4xl mx-auto my-10 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Special Offer Just for You!</h2>
      <p className="text-center mb-8 text-lg">
        Get 30% off on all premium plans. Limited time only!
      </p>
      <div className="flex justify-center">
        <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition">
          Claim Offer
        </button>
      </div>
    </section>
  );
};

export default OfferSection;
