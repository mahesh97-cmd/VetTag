import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAreaName from "../utils/getAreaName"; 

const PetPublicProfile = () => {
  const { qrCodeId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [areaName, setAreaName] = useState("");
  const [areaLoading, setAreaLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/qr/${qrCodeId}`
        );
        setPet(res.data.pet);
      } catch (err) {
        console.error("Error fetching pet by QR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [qrCodeId]);

  useEffect(() => {
    const fetchAreaName = async () => {
      if (pet?.lastSeenLocation?.coordinates?.length === 2) {
        const lat = pet.lastSeenLocation.coordinates[1];
        const lng = pet.lastSeenLocation.coordinates[0];
        const area = await getAreaName(lat, lng);
        setAreaName(area);
        setAreaLoading(false);
      }
    };

    fetchAreaName();
  }, [pet]);

  if (loading) return <p>Loading...</p>;
  if (!pet) return <p>No pet found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 px-4 py-10">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full text-center">
        {pet.lost ? (
          <p className="text-red-600 font-medium">
            This Pet Reported Lost By Owner
          </p>
        ) : null}

        <h1 className="text-3xl font-bold text-cyan-700 mb-4">Pet Profile</h1>
        <img
          src={pet.imageUrl || null}
          alt={pet.name}
          className="w-full h-56 object-cover rounded-md mb-4"
        />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {pet.name.toUpperCase()}
        </h2>
        <div>
          <p className="text-gray-600 mb-4">
            <strong>Breed:</strong> {pet.breed.toUpperCase()}
          </p>
          {pet.vaccinations?.length > 0 ? (
            <div className="text-gray-600 mb-4">
              <strong>Last Vaccination</strong>
              <p>
                Name:{" "}
                {pet.vaccinations[pet.vaccinations.length - 1].name.toUpperCase()}
              </p>
              <p>
                Date:{" "}
                {new Date(
                  pet.vaccinations[pet.vaccinations.length - 1].date
                ).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-4">
              <strong>Last Vaccination:</strong> Not available
            </p>
          )}
          {pet.lost && (
            <p className="text-red-700 mb-2">
              <strong>Last Seen Area:</strong>{" "}
              {areaLoading ? "Fetching location..." : areaName}
            </p>
          )}
        </div>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold text-cyan-600 mb-2">
          Owner Information
        </h3>
        <p className="text-gray-700 mb-1">
          <strong>Name:</strong> {pet.owner.name.toUpperCase()}
        </p>

        <p className="text-gray-700 mb-1">
          <strong>Phone:</strong> {pet?.owner?.phone}
        </p>

        <div className="mt-6">
          <a
            href={`tel:${pet?.owner?.phone}`}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full transition"
          >
            Call Owner
          </a>
        </div>
      </div>
    </div>
  );
};

export default PetPublicProfile;
