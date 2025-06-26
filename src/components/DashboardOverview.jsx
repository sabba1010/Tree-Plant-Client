import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";

const DashboardOverview = () => {
  const [user] = useAuthState(auth);
  const [totalItems, setTotalItems] = useState(0);
  const [myItems, setMyItems] = useState(0);

  useEffect(() => {
    fetch("https://tree-plant-server.vercel.app/plants")
      .then((res) => res.json())
      .then((data) => {
        setTotalItems(data.length);
        const mine = data.filter((item) => item.email === user?.email);
        setMyItems(mine.length);
      });
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-green-800">👋 Welcome, {user?.displayName || "User"}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">🌿 Total Items</h3>
          <p className="text-3xl mt-2 font-bold">{totalItems}</p>
        </div>
        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">🪴 My Items</h3>
          <p className="text-3xl mt-2 font-bold">{myItems}</p>
        </div>
        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">📧 Email</h3>
          <p className="mt-2">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
