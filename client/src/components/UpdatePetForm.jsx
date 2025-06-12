import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"];

const mapContainerStyle = {
  height: "300px",
  width: "100%",
};

const centerDefault = {
  lat: 26.4712,
  lng: 90.5612,
};

const UpdatePetForm = () => {
  const { petId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    allergies: "",
    dietaryNotes: "",
    lost: false,
    lastSeenCoordinates: centerDefault,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const autocompleteRef = useRef(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/singlePet/${petId}`,
          { withCredentials: true }
        );
        const pet = res.data.pet;
        setFormData((prev) => ({
          ...prev,
          name: pet.name || "",
          type: pet.type || "",
          breed: pet.breed || "",
          age: pet.age || "",
          gender: pet.gender || "",
          allergies: pet.allergies || "",
          dietaryNotes: pet.dietaryNotes || "",
          lost: pet.lost || false,
          lastSeenCoordinates: pet.lastSeenLocation?.coordinates
            ? {
                lat: pet.lastSeenLocation.coordinates[1],
                lng: pet.lastSeenLocation.coordinates[0],
              }
            : centerDefault,
        }));
      } catch (err) {
        console.error("Error fetching pet details:", err);
      }
    };
    fetchPetDetails();
  }, [petId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const onPlaceChanged = () => {
  if (!autocompleteRef.current) {
    alert("Autocomplete not loaded");
    return;
  }

  const place = autocompleteRef.current.getPlace();

  if (!place || !place.geometry || !place.geometry.location) {
    alert("Please select a location from the suggestions.");
    return;
  }

  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();

  setFormData((prev) => ({
    ...prev,
    lastSeenCoordinates: { lat, lng },
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatePayload = {
        ...formData,
        lastSeenCoordinates: [
          formData.lastSeenCoordinates.lng,
          formData.lastSeenCoordinates.lat,
        ],
      };

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/pets/${petId}`,
        updatePayload,
        { withCredentials: true }
      );

      alert("Pet updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed. Please try again.");
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-cyan-700">Update Pet</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Pet Name"
        required
      />
      <input
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Dog, Cat, Cow etc."
        required
      />
      <input
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Breed"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Age"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <textarea
        name="allergies"
        value={formData.allergies}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Allergies"
      />
      <textarea
        name="dietaryNotes"
        value={formData.dietaryNotes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Dietary Notes"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="lost"
          checked={formData.lost}
          onChange={handleChange}
        />
        Mark as Lost
      </label>

      <div className="flex gap-2">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search location (city, colony, etc.)"
            className="w-full p-2 border rounded"
          />
        </Autocomplete>
        <button
          type="button"
          onClick={onPlaceChanged}
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Search
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={formData.lastSeenCoordinates}
        onClick={(e) =>
          setFormData((prev) => ({
            ...prev,
            lastSeenCoordinates: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            },
          }))
        }
      >
        <Marker position={formData.lastSeenCoordinates} />
      </GoogleMap>

      <button
        type="submit"
        className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
      >
        Update Pet
      </button>
    </form>
  );
};

export default UpdatePetForm;
