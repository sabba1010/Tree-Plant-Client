import React from "react";

const AboutUs = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-green-900">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        About Us
      </h1>

      <p className="text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
        Welcome to <span className="font-semibold">GreenLeaf Plant Care</span>, your trusted partner in nurturing the natural beauty around you. 
        We are passionate about helping you grow a thriving green space with expert advice, quality plants, and a vibrant community of plant lovers.
      </p>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
            alt="Plants on shelves"
            className="rounded-lg shadow-lg object-cover w-full h-64 md:h-80"
          />
        </div>

        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p>
            Our mission is to empower everyone to create and maintain beautiful, healthy plants at home and in their communities by providing trusted guidance and quality resources.
          </p>

          <h2 className="text-2xl font-bold">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Extensive plant care guides tailored for all skill levels</li>
            <li>Wide selection of plants with detailed profiles</li>
            <li>Personalized support and tips for your unique green space</li>
            <li>A welcoming community of fellow plant enthusiasts</li>
          </ul>

          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <p>
            We love hearing from you! Whether you have questions, ideas, or just want to share your plant success stories, feel free to reach out at <a href="mailto:contact@greenleaf.com" className="text-green-700 underline">contact@greenleaf.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
