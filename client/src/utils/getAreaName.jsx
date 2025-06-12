const getAreaName = async (lat, lng) => {
  if (!lat || !lng) return "Unknown location";
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY2;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await res.json();

    if (data.status === "OK") {
      return data.results[0]?.formatted_address || "Unknown location";
    } else {
      return "Unknown location";
    }
  } catch (err) {
    console.error("Reverse geocoding error", err);
    return "Unknown location";
  }
};
export default getAreaName;