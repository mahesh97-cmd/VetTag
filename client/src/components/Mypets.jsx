import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const res = await axios.get("/api/pets/my");
      setPets(res.data.pets || []);
    } catch (err) {
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-cyan-700 mb-4">My Pets</h2>

      {loading ? (
        <p className="text-gray-600">Loading pets...</p>
      ) : pets.length === 0 ? (
        <p className="text-gray-600">No pets found. Add one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Link
              to={`/dashboard/pets/${pet._id}`}
              key={pet._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
              <p className="text-gray-600 text-sm">{pet.type}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPets;
