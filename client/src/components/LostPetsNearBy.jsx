import React, { useEffect, useState } from "react";
import  getAreaName  from "../utils/getAreaName";

const LostPetsNearby = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/lostPetNearBy?lat=${userLat}&lng=${userLng}`
          );

          const data = await res.json();

          if (res.ok) {
            const petsWithArea = await Promise.all(
              data.pets.map(async (pet) => {
                const [lng, lat] = pet?.lastSeenLocation?.coordinates || [];
                let area = "Unknown location";

                if (lat && lng) {
                  area = await getAreaName(lat, lng);
                }

                return { ...pet, area };
              })
            );

            setPets(petsWithArea);
          } else {
            setError(data.message || "Something went wrong.");
          }
        } catch (err) {
          console.error("Error fetching pets:", err);
          setError("Failed to fetch pets.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Location error:", err);
        setError("Please allow location access to find lost pets nearby.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div className="text-center py-10">Loading nearby lost pets...</div>;
  if (error) return <div className="text-red-600 text-center py-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Nearby Lost Pets</h2>

      {pets.length === 0 ? (
        <p className="text-center">No lost pets found near your location.</p>
      ) : (
        <div className="grid gap-4">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="border rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{pet.name || "Unnamed Pet"}</h3>
              <p className="text-sm text-gray-600">
                Last seen at: {pet.lastSeenLocation?.coordinates?.join(", ")}
              </p>

              {pet.owner && (
                <div className="mt-2 text-sm">
                  <p>👤 Owner: {pet.owner.name}</p>
                  <p>📞 Phone: {pet.owner.phone}</p>
                  <p>✉️ Email: {pet.owner.email}</p>
                </div>
              )}

              <p className="text-red-700 mt-2 text-sm">
                <strong>Last Seen Area:</strong> {pet.area}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostPetsNearby;
