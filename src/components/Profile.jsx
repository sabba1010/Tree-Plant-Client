import React from "react";

const Profile = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="space-y-3">
        <p><strong>Name:</strong> Sabba Hossain</p>
        <p><strong>Email:</strong> sabbahossqain@gmail.com</p>
        <p><strong>Role:</strong> Plant Care Enthusiast</p>
      </div>
    </div>
  );
};

export default Profile;