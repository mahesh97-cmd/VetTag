import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPets } from "../utils/petSlice";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/userAllPets`,
        {
          withCredentials: true,
        }
      );
      console.log(res, "from my pets");
      dispatch(addPets(res.data.pets));
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

  const handleDownload = async (imageUrl, fileName = "VetTag_QR.png") => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download QR code:", error);
      alert("Download failed");
    }
  };
  console.log(pets, "pets data");
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
            <div
              key={pet._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <Link to={`/dashboard/pets/${pet._id}`}>
                <img
                  src={pet.imageUrl || null}
                  alt={pet.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {pet.name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm">
                  Type: <span className="text-gray-500">{pet.type}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Breed: <span className="text-gray-500">{pet.breed}</span>
                </p>
              </Link>
              <button className="mt-4 bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition ">
                <Link to={`/dashboard/pet/vaccination/${pet._id}`}>
                  vaccinations
                </Link>
              </button>

              {pet.qrCodeImage && (
                <button
                  onClick={() =>
                    handleDownload(pet.qrCodeImage, `VetTag_QR_${pet.name}.png`)
                  }
                  className="mt-2 bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition w-full"
                >
                  Download QR Code
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPets;
