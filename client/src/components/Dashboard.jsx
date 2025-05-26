import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">👋 Welcome to VetTag Dashboard</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">🐶 Your Pets</h2>
            <Link to="/add-pet" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              + Add New Pet
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-gray-500">You haven't added any pets yet.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

